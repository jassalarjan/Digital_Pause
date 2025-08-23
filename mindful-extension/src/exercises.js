import BreathingExercise from "./exercises/breathing";
import NeckStretch from "./exercises/NeckStrech";
import ShoulderRolls from "./exercises/ShoulderRolls";
import ForwardBend from "./exercises/forwardBend";
import SeatedTwist from "./exercises/seatedtwist";
import AnkleRotations from "./exercises/AnkledRotations"; // file name me "d" hai
import PalmPress from "./exercises/PalmPress";
import WristStretch from "./exercises/WristStretch";
import SideStretch from "./exercises/SideStretch";

const exercises = [
  { name: "Breathing Exercise", duration: 30, component: BreathingExercise },
  { name: "Neck Stretch", duration: 20, component: NeckStretch },
  { name: "Shoulder Rolls", duration: 25, component: ShoulderRolls },
  { name: "Forward Bend", duration: 30, component: ForwardBend },
  { name: "Seated Twist", duration: 25, component: SeatedTwist },
  { name: "Ankle Rotations", duration: 20, component: AnkleRotations },
  { name: "Palm Press", duration: 15, component: PalmPress },
  { name: "Wrist Stretch", duration: 20, component: WristStretch },
  { name: "Side Stretch", duration: 25, component: SideStretch },
];

export default exercises;
