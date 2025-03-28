/**
 * This script converts a basic text file with Custom CC mappings to Akai Force Midi CC Map template that can be loaded to a midi trcka to control external Hrdware/Software
 * compatible with the Force MIDI Map Maker application.
 * Requirements nodeJs should be installed in your system.
 * usage:
 * node convert.js "[midiMapppingFile].txt" 
 * a FileNames [midiMappingFile].xpm will be created for that Text Template.
 * the Template first line should always be ##FORCEMIDIMAP
 * any lines starting with  3 are ignored // comment line
 *  any text after # in a lnie not starting with # is ignored (inline comment)
 * each mapping line should start with CC Numnber followed by = and Paramater Title. example: 11 = Expression
 * any missing cc in file will automatically be set to no show. (--)
 * (CC will be mapped in the order  set in the file. 16/page, starting from bottom left to top right)
 *  for custom ordering or blank spaces(you can put in unused CC there like 125 = --)
 * avoid using cc above 120 as those are global (omniimode) messages.
 *  cc 0 is not used so that line will be excluded
 * avoid avoid generic cc for custom parameters like CC:1 Modulation/modwheel, CC:64 Sustain. CC:10 Pan.. 
 * as Force may reset Volume. Sustain and Pan on clip changes..
 * Author: Amit Talwar
 **/
const fs = require('fs');
const path = require('path');
const header = "##FORCEMIDIMAP"
const NOASSIGN = 2147483647;
const layoutNode = `    <Parameter Position="#ADDRESS">
        <Index>#CC</Index>
        <Value>0.000000</Value>
      </Parameter>`;
const CCPARAM = `<Parameter Index="#CC" Name="#NAME"/>`;


const template = readTemplate();
convert(template)

function convert(mapping) {
    let T = fs.readFileSync("./src/xpm.template").toString();
    T = T.replace("#NAME#", mapping.name);
    let layout = [];
    let map = [];
    for (i = 1; i <= 127; i++) {
        let pos = (i - 1) % 16;
        let page = Math.floor(((i - 1) / 16));
        let addr = `${page} 0 ${pos}`;
        let l = layoutNode.replace("#ADDRESS", addr);
        let lcc = NOASSIGN;
        if (mapping.layout[i] != NOASSIGN) {
            lcc = mapping.CC[mapping.layout[i]];
            lcc = lcc == "--" ? NOASSIGN : mapping.layout[i];
        }
        l = l.replace("#CC", lcc);
        layout.push(l);
        let cc = CCPARAM.replace('#CC', i);
        cc = cc.replace("#NAME", mapping.CC[i]);
        map.push(cc);

    }
    //console.log(layout.join("\n"));
    //console.log(map.join("\n"));
    let ofile = path.resolve(mapping.fileName);
    T = T.replace("#LAYOUT#", layout.join("\n"));
    T = T.replace("#CCMAP#", map.join("\n"));
    fs.writeFileSync(ofile, T);
    console.log("Written Xpm Template:", ofile);

}


function readTemplate() {
    try {
        if (process.argv.length < 3) {
            throw ("Please Provide a Template FileName as Parameter");
        }

        const fileName = process.argv[2];
        if (!fs.existsSync(fileName)) {
            throw ("File " + fileName + " does not exist");
        }
        let data = fs.readFileSync(fileName, 'utf8').toString().trim().split("\n").filter(l => l.trim() != "");
        if (data[0] != header) {
            throw ("Template Format Error! File " + fileName + " does not start with " + header);
        }
        data = data.filter(l => !l.trim().startsWith("#")).map(l => {
            l = l.trim().replace(/#.*$/, "");
            return l;
        }).filter(l => /^[1-9][0-9]{0,2} *=.*$/.test(l));

        const mapping = {};
        if (data.length < 1) {
            throw ('No Valid Mapping Lines found in Template');
        }
        const ofn = path.basename(fileName).split(".").slice(0, -1).join(".");
        const ofile = path.join(path.dirname(fileName), ofn + ".xpm");
        //console.log(data);
        mapping["CC"] = Array(128).fill("--");
        mapping["layout"] = [...Array(128).fill(NOASSIGN)];
        mapping.name = ofn;
        mapping.fileName = ofile
        data.forEach((d, i) => { // for each template entity populate mapping accordingly
            let line = d.split("=");
            let cc = parseInt(line[0]);
            let name = line[1].trim();
            name = name == '' ? "--" : name;
            //console.log(i + 1, cc, name);
            mapping.CC[cc] = name;
            mapping.layout[i + 1] = cc;
        });



        return mapping;



    } catch (e) {
        console.error("Error *************************************\n", e);
        process.exit(1);
    }

}
