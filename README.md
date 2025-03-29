# Force Midi Map Maker

## Description

ForceMidiMapMaker is a command-line tool designed to simplify the creation of custom MIDI CC (Control Change) maps for the Akai Force. It takes a simple text-based template file as input and generates an Akai Force-compatible XPM file. This XPM file can then be loaded into a MIDI track on the Akai Force, allowing you to control external hardware or software synthesizers and effects using their custom tailored mappings.

## Features

*   **Text-Based Templates:** Define your MIDI CC mappings in an easy-to-read text file. 
*   **Automatic XPM Generation:** Converts your text template into a ready-to-use XPM file for the Akai Force.
*   **Customizable Layout:** Control the order and placement of CC parameters on the Force's display pages.
*   **Automatic "No Show" Handling:** Any unassigned CCs are automatically set to "no show" (`--`) in the XPM file.
*   **Comment Support:** Use `#` to add comments to your template files for better organization and readability.

* **Avoids Generic CCs:** The tool encourages the user to avoid using generic CCs like Modulation, Sustain, and Pan, as the Force may reset them on clip changes.

* **Supports both Python and Javascript:** The project includes both python and javascript versions of the tool.

## Requirements

*   **Python Version:** Python 3.x (for `convert.py`)
*   **Node.js Version:** Node.js (for `convert.js`)
*   **Akai Force:** To use the generated XPM files.

## Usage

### Python Version (`convert.py`)

1.  **Create a Template File:** Create a text file (e.g., `my_midi_map.txt`) following the template file format described below.
2.  **Run the Script in terminal:**
    ```bash
    python convert.py my_midi_map.txt
    ```
3.  **Output:** A file named `my_midi_map.xpm` will be created in the same directory as your template file.
4.  **Load on Akai Force:** Copy the `.xpm` file to your Akai Force and load it into a MIDI track.

### JavaScript Version (`convert.js`)

1.  **Create a Template File:** Create a text file (e.g., `my_midi_map.txt`) following the template file format described below.
2.  **Run the Script in terminal:**
    ```bash
    node convert.js my_midi_map.txt
    ```
3.  **Output:** A file named `my_midi_map.xpm` will be created in the same directory as your template file.
4.  **Load on Akai Force:** Copy the `.xpm` file to your Akai Force and load it into a MIDI track.

## Template File Format

*   **Header:** The first line of your template file **must** be `##FORCEMIDIMAP`.
*   **Comments:**
    *   Lines starting with `#` are ignored (comment lines).
    *   Any text after `#` on a line that doesn't start with `#` is also ignored (inline comments).
*   **Mapping Lines:**
    *   Each mapping line defines a CC parameter.
    *   The format is: `CC_NUMBER = PARAMETER_NAME`
    *   Example: `11 = Expression`
*   **Blank Spaces:**
    *   To create blank spaces on the Force's display, use an unused CC number and set the name to `--`.
    *   Example: `125 = --`
*   **CC Numbering:**
    *   CC numbers range from 1 to 127.
    *   CC 0 is not used and will be excluded.
    *   Avoid using CCs above 120, as those are typically global (omni mode) messages and can cause problems.
*   **Order:** CCs are mapped in the order they appear in the file, 16 per page, starting from the bottom left to the top right on the Force's display.
* **Avoid Generic CCs:** Avoid using generic CCs like CC 1 (Modulation), CC 64 (Sustain), and CC 10 (Pan) for custom parameters. The Force may reset these on clip changes.

### Example Template (`TeraPro IOS.txt`)

```plaintext
##FORCEMIDIMAP
#basic general Midi Template with Known Parameters
#CC 119 WITH VALUE OF -- IS USED AS EMPTY PLACE HOLDER
#page 1 ---------------------

7   = Volume
3   = Amp Drive
4   = Amp Blend
10   = PAN
5    = Attack - ADSR1
6    = Decay - ADSR1
8    = Sustain - ADSR1 
9    = Release  - ADSR1
12   = Delay - ADSR 1
119 = --
119 = --
1   =  Mod Wheel
11   = Expression
80 = VINTAGE 
81 = PORTAMENTO
2   =  Breath

#PAGE 2
23 =   MIXER 1
24 =   MIXER 2
25 =   MIXER 3
26 =   MIXER 4
27 =   MIXER 5
119 =  --
119 =  --
119 =  --

28 =   SPEC CUTOFF 
29 =   SPEC MORPH
30 =   SPEC RASTER
40 = RNGZ FREQ 
41 = RNGZ STRUCTURE
42 = RNGZ BRIGHTNESS
43 = RNGZ DAMPING
44 = RNGZ POSITION

#PAGE 3

31 = BRN HARMONICS
33 = BRN TIMBRE
34 = BRN MORPH
35 = BRN FREQ
36 = BRN FM MOD
37 = BRN ENV DECAY
38 = BRN ENV COLOR
119 = -- 

50 = WT1 FINE -/+
51 = WT1 POSITION
52 = WT1 PHASE
53 = WT1 FM IDX
54 = WT2 FINE -/+
55 = WT2 POSITION
56 = WT2 PHASE
57 = WT2 FM IDX

#PAGE4

70 = F1 CUTOFF
71 = F1 RESONANCE
72 = F1 DRIVE
73=  F1 GRIT
74 = F1 TRACK
119 =  --
119 =  --
119 =  --
75 = F2 CUTOFF
76 = F2 RESONANCE
77 = F2 DRIVE
78=  F2 SHIFT
79 = F2 TRACK
119 =  --
119 =  --
119 =  --

#PAGE-5
13   = FM Bright -/+
14   = FM ATTACK -/+
15   = FM SUSTAIN -/+
16   = FM DECAY -/+

17   = FM TREMOLO -/+
18   = FM WOW -/+
19 =   FM VEL SENS -/+
119 =  --

20 =   FM PITCH MOD SENS
21 =   FM MOD WHEEL AMT
22 =   FM FEEDBACK
#...... etc
```
## Author
Amit Talwar

[[www.amitszone.com](https://www.amitszone.com)]
 [[midi.amitszone.com](https://midi.amitszone.com)]
 
## License
 DWTFYW (Do whatever the F*** you want!)

### NOTE
This README.md was majorly generated with Google Gemini AI.
