import type {
  AssessmentResult,
  Exercise,
  MediaAsset,
  TechniqueSkill,
  WeeklyPlan,
  WorkoutBlock,
  WorkoutDay
} from "@/types/training";

export const equipmentOptions = [
  "bodyweight only",
  "resistance band",
  "kettlebell/dumbbell",
  "medicine ball",
  "wall access"
] as const;

export const goalOptions = ["speed", "power", "footwork", "balance", "technique", "conditioning"] as const;

export const fitnessLevels = ["beginner", "intermediate", "advanced"] as const;

export const categoryMeta = {
  power: { label: "Power", accent: "power" },
  agility: { label: "Agility", accent: "agility" },
  speed: { label: "Speed", accent: "speed" },
  technique: { label: "Technique", accent: "technique" },
  mobility: { label: "Mobility", accent: "mobility" },
  conditioning: { label: "Conditioning", accent: "conditioning" },
  recovery: { label: "Recovery", accent: "mobility" }
} as const;

const media = (id: string, title: string, type: MediaAsset["type"] = "video"): MediaAsset[] => [
  {
    id: `${id}-${type}`,
    type,
    title,
    thumbnail: `/media/${id}.jpg`,
    durationLabel: type === "video" ? "0:25" : "Loop"
  }
];

const createExercise = (exercise: Exercise): Exercise => exercise;

export const exercises: Exercise[] = [
  createExercise({
    id: "march-jog-place",
    name: "March or light jog in place",
    category: "conditioning",
    description: "Build heat before movement work and get into an athletic stance early.",
    instructions: ["Stay tall through the torso.", "Land softly and keep the arms relaxed."],
    durationSeconds: 60,
    cues: ["Breathe through the nose if possible.", "Stay light on the balls of the feet."],
    mistakes: ["Starting too hard.", "Leaning back and pounding the floor."],
    equipment: [],
    regressions: ["Slow march with arm drive."],
    progressions: ["Jog with quick split-step pulses every 10 seconds."],
    media: media("march-jog-place", "Warm-up pulse"),
    tags: ["warmup", "conditioning", "footwork"],
    howItShouldFeel: "Comfortably warm, not taxing.",
    relatedExerciseIds: ["simulated-jump-rope", "split-step-bounce"],
    swapOptions: ["simulated-jump-rope"]
  }),
  createExercise({
    id: "simulated-jump-rope",
    name: "Jump rope or simulated rope",
    category: "agility",
    description: "Wake up ankle stiffness and rhythm for faster first steps.",
    instructions: ["Keep bounces small.", "Stay under the hips and keep a relaxed upper body."],
    durationSeconds: 60,
    cues: ["Think quick contacts.", "Quiet feet beat high jumps."],
    mistakes: ["Jumping too high.", "Losing posture."],
    equipment: ["jump rope optional"],
    regressions: ["Alternating toe taps in place."],
    progressions: ["Single-leg alternating rope rhythm."],
    media: media("simulated-jump-rope", "Rhythm primer", "animation"),
    tags: ["warmup", "agility", "speed"],
    howItShouldFeel: "Springy through the ankles.",
    relatedExerciseIds: ["march-jog-place", "line-hops-front-back"],
    swapOptions: ["march-jog-place", "line-hops-front-back"]
  }),
  createExercise({
    id: "hip-circles",
    name: "Hip circles",
    category: "mobility",
    description: "Open the hips before lateral movement and rotation.",
    instructions: ["Lift one knee and draw a smooth circle.", "Control both directions."],
    reps: "10 each side",
    cues: ["Move slowly enough to own the range.", "Stay tall through the standing leg."],
    mistakes: ["Swinging the leg fast.", "Letting the torso collapse."],
    equipment: [],
    regressions: ["Hold a wall for support."],
    progressions: ["Add a balance pause at the top."],
    media: media("hip-circles", "Hip prep", "animation"),
    tags: ["warmup", "mobility", "balance"],
    relatedExerciseIds: ["ninety-ninety-switches", "hip-flexor-stretch"],
    swapOptions: ["ninety-ninety-switches"]
  }),
  createExercise({
    id: "arm-circles",
    name: "Arm circles",
    category: "mobility",
    description: "Prime the shoulders for volleys, counters, and band work.",
    instructions: ["Perform forward then backward circles.", "Keep ribs stacked."],
    reps: "10 forward / 10 backward",
    cues: ["Long arms with easy shoulders.", "Do not arch the low back."],
    mistakes: ["Shrugging the shoulders.", "Rushing through range."],
    equipment: [],
    regressions: ["Smaller circles."],
    progressions: ["Add split stance with rotation."],
    media: media("arm-circles", "Shoulder prep", "animation"),
    tags: ["warmup", "mobility", "shoulders"],
    relatedExerciseIds: ["shoulder-external-rotation-band", "thoracic-rotation"],
    swapOptions: ["thoracic-rotation"]
  }),
  createExercise({
    id: "worlds-greatest-stretch",
    name: "World's greatest stretch",
    category: "mobility",
    description: "Open ankle, hip, thoracic spine, and hamstring range in one sequence.",
    instructions: ["Step long into a lunge.", "Reach the elbow down then rotate the chest open."],
    reps: "4 each side",
    cues: ["Breathe at end range.", "Drive the back heel long."],
    mistakes: ["Collapsing the front knee inward.", "Rushing the rotation."],
    equipment: [],
    regressions: ["Static lunge with arm reach."],
    progressions: ["Add hamstring rock-back before switching sides."],
    media: media("worlds-greatest-stretch", "Full-body mobility", "animation"),
    tags: ["warmup", "mobility", "recovery"],
    relatedExerciseIds: ["thoracic-rotation", "hip-flexor-stretch"],
    swapOptions: ["thoracic-rotation", "hip-flexor-stretch"]
  }),
  createExercise({
    id: "lateral-lunge",
    name: "Lateral lunge",
    category: "agility",
    description: "Build side-to-side range and push strength for wide balls.",
    instructions: ["Sit into one hip while keeping the other leg long.", "Push back to center under control."],
    reps: "8 each side",
    cues: ["Chest stays proud.", "Push the floor away to return."],
    mistakes: ["Knee caving inward.", "Folding the torso excessively."],
    equipment: [],
    regressions: ["Shorter range side shift."],
    progressions: ["Add paddle reach at the bottom."],
    media: media("lateral-lunge", "Wide base strength"),
    tags: ["agility", "balance", "reaching"],
    howItShouldFeel: "Loaded glute and inner thigh stretch.",
    relatedExerciseIds: ["wide-plant-push-center", "lunge-reach-paddle"],
    swapOptions: ["single-leg-lateral-reach", "wide-plant-push-center"]
  }),
  createExercise({
    id: "glute-bridge",
    name: "Glute bridges",
    category: "power",
    description: "Prime hip extension before jumps, drives, and rotational work.",
    instructions: ["Press through the heels and squeeze the glutes.", "Pause briefly at the top."],
    reps: "12",
    cues: ["Ribs down.", "Drive the hips, not the low back."],
    mistakes: ["Overarching the spine.", "Pushing through the toes."],
    equipment: [],
    regressions: ["Short-range bridge."],
    progressions: ["Single-leg bridge."],
    media: media("glute-bridge", "Hip drive primer", "animation"),
    tags: ["warmup", "power", "posterior-chain"],
    relatedExerciseIds: ["kettlebell-swing", "squat-jump"],
    swapOptions: ["dead-bug"]
  }),
  createExercise({
    id: "dead-bug",
    name: "Dead bugs",
    category: "recovery",
    description: "Train rib position and core control for better rotation and balance.",
    instructions: ["Press the low back lightly into the floor.", "Reach opposite arm and leg long."],
    reps: "10 each side",
    cues: ["Move slow enough to keep the trunk quiet.", "Exhale as the limbs extend."],
    mistakes: ["Arching the back.", "Moving too fast to control."],
    equipment: [],
    regressions: ["Legs only or arms only."],
    progressions: ["Add a mini band around the feet."],
    media: media("dead-bug", "Core brace", "animation"),
    tags: ["warmup", "core", "recovery"],
    relatedExerciseIds: ["pallof-press-hold", "glute-bridge"],
    swapOptions: ["glute-bridge"]
  }),
  createExercise({
    id: "split-step-bounce",
    name: "Split-step bounce",
    category: "agility",
    description: "Groove ready-position timing and foot reactivity before movement drills.",
    instructions: ["Stay low with quick quiet bounces.", "Land ready to move either way."],
    durationSeconds: 30,
    cues: ["Heels barely kiss the floor.", "Hands and paddle stay ready."],
    mistakes: ["Standing too tall.", "Letting the feet drift wide."],
    equipment: ["paddle optional"],
    regressions: ["March to split stance rhythm."],
    progressions: ["React to a random visual cue."],
    media: media("split-step-bounce", "Ready position rhythm", "animation"),
    tags: ["warmup", "agility", "footwork"],
    howItShouldFeel: "Elastic and ready to spring.",
    relatedExerciseIds: ["split-step-to-shuffle", "split-step-sprint"],
    swapOptions: ["split-step-to-shuffle"]
  }),
  createExercise({
    id: "shadow-side-shuffles",
    name: "Shadow side shuffles",
    category: "agility",
    description: "Introduce short shuffle patterns while staying balanced in pickleball posture.",
    instructions: ["Shuffle two to three steps each way.", "Keep the chest level and paddle quiet."],
    durationSeconds: 30,
    cues: ["Do not click the feet together.", "Push, then glide."],
    mistakes: ["Crossing over too early.", "Bouncing vertically."],
    equipment: ["paddle optional"],
    regressions: ["Smaller range shuffle."],
    progressions: ["Add split-step reset between changes."],
    media: media("shadow-side-shuffles", "Lateral prep", "animation"),
    tags: ["warmup", "agility", "footwork"],
    relatedExerciseIds: ["split-step-to-shuffle", "shuffle-shuffle-touch"],
    swapOptions: ["split-step-to-shuffle"]
  }),
  createExercise({
    id: "split-step-shuffle-right-left",
    name: "Split step + shuffle right + shuffle left",
    category: "agility",
    description: "Blend reactive footwork into short court coverage patterns.",
    instructions: ["Bounce into a split step, then shuffle out and back each direction.", "Reset posture after every change."],
    durationSeconds: 20,
    cues: ["Stay compact.", "Push off the inside edge."],
    mistakes: ["Crossing feet.", "Letting the paddle drift behind the body."],
    equipment: ["paddle optional"],
    regressions: ["One direction only."],
    progressions: ["Add a shadow swing after each shuffle."],
    media: media("split-step-shuffle-right-left", "Reactive shuffle pattern", "animation"),
    tags: ["warmup", "agility", "footwork"],
    relatedExerciseIds: ["split-step-to-shuffle", "shadow-side-shuffles"],
    swapOptions: ["split-step-to-shuffle", "shadow-side-shuffles"]
  }),
  createExercise({
    id: "shadow-forehand-swing",
    name: "Shadow forehand swing",
    category: "technique",
    description: "Rehearse compact forehand mechanics without ball pressure.",
    instructions: ["Set the paddle early.", "Turn the shoulders, step, and finish under control."],
    reps: "8",
    cues: ["Contact slightly in front.", "Let the hips start the motion."],
    mistakes: ["Arming the swing.", "Late paddle prep."],
    equipment: ["paddle optional"],
    regressions: ["Half-speed shadow reps."],
    progressions: ["Pause at load and contact positions."],
    media: media("shadow-forehand-swing", "Forehand shape"),
    tags: ["warmup", "forehand", "technique"],
    howItShouldFeel: "Smooth from the ground up.",
    relatedExerciseIds: ["forehand-shadow-reps", "shadow-forehand-hip-turn"],
    swapOptions: ["forehand-shadow-reps", "shadow-forehand-hip-turn"]
  }),
  createExercise({
    id: "shadow-backhand-swing",
    name: "Shadow backhand swing",
    category: "technique",
    description: "Pattern the shoulder turn and stable contact point for backhands.",
    instructions: ["Turn the shoulders first.", "Set the paddle face and finish balanced."],
    reps: "8",
    cues: ["Contact in front.", "Stable wrist all the way through."],
    mistakes: ["Opening the shoulders late.", "Flipping with the wrist."],
    equipment: ["paddle optional"],
    regressions: ["Shorter stroke with pause at contact."],
    progressions: ["Add a recovery step after the finish."],
    media: media("shadow-backhand-swing", "Backhand shape"),
    tags: ["warmup", "backhand", "technique"],
    relatedExerciseIds: ["backhand-shadow-reps", "shadow-backhand-drive"],
    swapOptions: ["backhand-shadow-reps"]
  }),
  createExercise({
    id: "shadow-volley-punch",
    name: "Shadow volley punch",
    category: "technique",
    description: "Rehearse compact forward punch mechanics with fast recovery.",
    instructions: ["Start in ready position.", "Punch forward a few inches and recover immediately."],
    reps: "10",
    cues: ["Little backswing.", "Contact in front of the chest."],
    mistakes: ["Big arm swing.", "Dropping the paddle after contact."],
    equipment: ["paddle optional"],
    regressions: ["Isometric hold at contact."],
    progressions: ["Alternate forehand and backhand punches."],
    media: media("shadow-volley-punch", "Compact volley pattern", "animation"),
    tags: ["warmup", "volley", "technique"],
    relatedExerciseIds: ["forehand-volley-punch-shadow", "backhand-volley-punch-shadow"],
    swapOptions: ["forehand-volley-punch-shadow", "backhand-volley-punch-shadow"]
  }),
  createExercise({
    id: "squat-jump",
    name: "Squat jump",
    category: "power",
    description: "Develop lower-body force for more explosive starts and drives.",
    instructions: ["Sit into a quick squat.", "Jump vertically and land softly in athletic stance."],
    sets: 3,
    reps: "5 reps",
    restSeconds: 45,
    cues: ["Explode fast.", "Stick the landing before the next rep."],
    mistakes: ["Caving knees in.", "Rushing the landing."],
    equipment: [],
    regressions: ["Bodyweight squat to calf raise."],
    progressions: ["Reactive squat jump with split-step reset."],
    media: media("squat-jump", "Vertical pop"),
    tags: ["power", "legs", "first-step"],
    howItShouldFeel: "Quick, crisp power without fatigue.",
    relatedExerciseIds: ["lateral-bound-stick", "kettlebell-swing"],
    swapOptions: ["lateral-bound-stick", "glute-bridge"]
  }),
  createExercise({
    id: "lateral-bound-stick",
    name: "Lateral bound to stick",
    category: "power",
    description: "Build side-to-side power and braking control for wide ball coverage.",
    instructions: ["Jump laterally from one leg to the other.", "Freeze the landing before the next rep."],
    sets: 3,
    reps: "5 each side",
    restSeconds: 45,
    cues: ["Push sideways, not upward.", "Own the landing knee position."],
    mistakes: ["Falling off balance.", "Landing with a stiff leg."],
    equipment: [],
    regressions: ["Skater step with pause."],
    progressions: ["Bound then shadow swing on landing."],
    media: media("lateral-bound-stick", "Lateral push and stick"),
    tags: ["power", "balance", "agility"],
    relatedExerciseIds: ["skater-steps", "wide-plant-push-center"],
    swapOptions: ["skater-steps", "lateral-lunge"]
  }),
  createExercise({
    id: "kettlebell-swing",
    name: "Kettlebell swing",
    category: "power",
    description: "Train fast hip extension that transfers well to explosive movement.",
    instructions: ["Hinge, load the hips, and snap tall.", "Let the bell float from hip speed."],
    sets: 3,
    reps: "10 to 15 reps",
    restSeconds: 60,
    cues: ["Arms are straps.", "Finish with glutes and abs tight."],
    mistakes: ["Squatting the swing.", "Lifting with the shoulders."],
    equipment: ["kettlebell/dumbbell"],
    regressions: ["Hip hinge snap with towel."],
    progressions: ["Heavy set with fewer reps."],
    media: media("kettlebell-swing", "Hip snap power"),
    tags: ["power", "posterior-chain", "conditioning"],
    howItShouldFeel: "Explosive through the hips, not the low back.",
    relatedExerciseIds: ["glute-bridge", "squat-to-press"],
    swapOptions: ["glute-bridge", "squat-jump"]
  }),
  createExercise({
    id: "band-rotational-chop",
    name: "Band rotational pull or chop",
    category: "power",
    description: "Link hips, trunk, and shoulders for rotational paddle speed.",
    instructions: ["Start loaded through the hips.", "Rotate through the torso without losing balance."],
    sets: 3,
    reps: "8 each side",
    restSeconds: 45,
    cues: ["Turn through the rib cage.", "Stay stacked over the feet."],
    mistakes: ["Pulling only with the arms.", "Spinning off the floor."],
    equipment: ["resistance band"],
    regressions: ["Half-kneeling anti-rotation press."],
    progressions: ["Faster concentric with controlled return."],
    media: media("band-rotational-chop", "Rotational pull"),
    tags: ["power", "rotational", "forehand", "backhand"],
    relatedExerciseIds: ["band-woodchop", "band-lift", "shadow-forehand-hip-turn"],
    swapOptions: ["band-woodchop", "band-lift"]
  }),
  createExercise({
    id: "half-kneeling-band-press-rotation",
    name: "Half-kneeling band press with rotation",
    category: "power",
    description: "Challenge core stability while turning through the upper body.",
    instructions: ["Set a half-kneeling stance.", "Press and rotate over the front hip."],
    sets: 3,
    reps: "8 each side",
    restSeconds: 45,
    cues: ["Glute on the down knee stays on.", "Rotate without leaning."],
    mistakes: ["Arching the low back.", "Losing rib position."],
    equipment: ["resistance band"],
    regressions: ["Tall-kneeling band press."],
    progressions: ["Standing split-stance band press rotation."],
    media: media("half-kneeling-band-press-rotation", "Rotational press"),
    tags: ["power", "core", "rotational"],
    relatedExerciseIds: ["pallof-press-hold", "band-rotational-chop"],
    swapOptions: ["pallof-press-hold", "band-rotational-chop"]
  }),
  createExercise({
    id: "shadow-forehand-hip-turn",
    name: "Shadow forehand with hip turn",
    category: "technique",
    description: "Blend lower-body load and hip turn into forehand mechanics.",
    instructions: ["Load into the outside hip.", "Unwind the hips before the paddle releases."],
    sets: 3,
    reps: "10 reps",
    cues: ["Unit turn first.", "Finish balanced and ready."],
    mistakes: ["Opening too early.", "Stepping across the body."],
    equipment: ["paddle optional"],
    regressions: ["Half-speed pause reps."],
    progressions: ["Add split-step then swing."],
    media: media("shadow-forehand-hip-turn", "Forehand from the ground up"),
    tags: ["technique", "forehand", "rotational"],
    relatedExerciseIds: ["shadow-forehand-swing", "forehand-shadow-reps"],
    swapOptions: ["forehand-shadow-reps"]
  }),
  createExercise({
    id: "split-step-to-shuffle",
    name: "Split step to shuffle",
    category: "agility",
    description: "Train first reaction out of the split step into lateral court coverage.",
    instructions: ["Bounce into a split step.", "Shuffle two quick steps and reset."],
    durationSeconds: 20,
    restSeconds: 30,
    cues: ["Push off the inside foot.", "Stay low enough to move either direction."],
    mistakes: ["Standing tall after the split step.", "Crossing the feet."],
    equipment: ["paddle optional"],
    regressions: ["Single direction shuffles."],
    progressions: ["Random direction callouts."],
    media: media("split-step-to-shuffle", "Split to move", "animation"),
    tags: ["agility", "speed", "footwork"],
    relatedExerciseIds: ["split-step-bounce", "shuffle-shuffle-touch"],
    swapOptions: ["shuffle-shuffle-touch", "shadow-side-shuffles"]
  }),
  createExercise({
    id: "forward-backward-movement",
    name: "Forward-backward movement",
    category: "agility",
    description: "Sharpen transition steps moving into the kitchen and recovering out.",
    instructions: ["Take two to three quick steps forward and back.", "Stay on balance into each stop."],
    durationSeconds: 20,
    restSeconds: 30,
    cues: ["Quiet upper body.", "Brake with control before reversing."],
    mistakes: ["Crossing the feet backward.", "Leaning too far forward."],
    equipment: ["paddle optional"],
    regressions: ["Shorter range pattern."],
    progressions: ["Add volley shadow on the forward closeout."],
    media: media("forward-backward-movement", "Transition steps", "animation"),
    tags: ["agility", "footwork", "recovery"],
    relatedExerciseIds: ["crossover-recovery-step", "split-step-sprint"],
    swapOptions: ["split-step-sprint", "shadow-side-shuffles"]
  }),
  createExercise({
    id: "crossover-recovery-step",
    name: "Crossover recovery step",
    category: "agility",
    description: "Learn the longer recovery step needed on wider balls.",
    instructions: ["Push out wide, crossover to recover, then settle back to ready.", "Keep the chest under control."],
    durationSeconds: 20,
    restSeconds: 30,
    cues: ["Use crossover only when the distance demands it.", "Return to a balanced base."],
    mistakes: ["Crossing too soon.", "Standing up during recovery."],
    equipment: ["paddle optional"],
    regressions: ["Shuffle out and back."],
    progressions: ["Reach with paddle before the recovery step."],
    media: media("crossover-recovery-step", "Wide-ball recovery", "animation"),
    tags: ["agility", "footwork", "reaching"],
    relatedExerciseIds: ["wide-plant-push-center", "lunge-reach-paddle"],
    swapOptions: ["wide-plant-push-center", "lunge-reach-paddle"]
  }),
  createExercise({
    id: "forehand-shadow-reps",
    name: "Forehand shadow reps",
    category: "technique",
    description: "Deliberate forehand patterning with repeatable setup and finish.",
    instructions: ["Reset to ready between every rep.", "Make each rep identical before adding speed."],
    sets: 3,
    reps: "8 reps",
    cues: ["Athletic base.", "Paddle prepared early.", "Step to the ball.", "Contact slightly in front."],
    mistakes: ["Late turn.", "Contact drifting too close to the body."],
    equipment: ["paddle optional"],
    regressions: ["Static stance reps."],
    progressions: ["Movement into contact from a shuffle."],
    media: media("forehand-shadow-reps", "Forehand rehearsal"),
    tags: ["technique", "forehand"],
    relatedExerciseIds: ["shadow-forehand-swing", "wall-forehand"],
    swapOptions: ["wall-forehand", "shadow-forehand-hip-turn"]
  }),
  createExercise({
    id: "backhand-shadow-reps",
    name: "Backhand shadow reps",
    category: "technique",
    description: "Repeatable backhand pattern with early shoulder turn and stable wrist.",
    instructions: ["Set the shoulders first.", "Finish balanced and return to ready."],
    sets: 3,
    reps: "8 reps",
    cues: ["Shoulders turn early.", "Paddle set early.", "Contact in front.", "Balanced finish."],
    mistakes: ["Late prep.", "Overusing the wrist."],
    equipment: ["paddle optional"],
    regressions: ["Short swing with pause at contact."],
    progressions: ["Add a small recovery shuffle after the swing."],
    media: media("backhand-shadow-reps", "Backhand rehearsal"),
    tags: ["technique", "backhand"],
    relatedExerciseIds: ["shadow-backhand-swing", "wall-backhand"],
    swapOptions: ["wall-backhand", "shadow-backhand-swing"]
  }),
  createExercise({
    id: "wall-forehand",
    name: "Forehand against wall",
    category: "technique",
    description: "Use wall rhythm to train compact contact and quick recovery.",
    instructions: ["Aim for a repeatable chest-high target.", "Recover the paddle immediately after each hit."],
    durationSeconds: 120,
    cues: ["Stay relaxed in the grip.", "Keep the ball in front."],
    mistakes: ["Swinging too hard.", "Letting the ball crowd the body."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Self-drop hit and catch."],
    progressions: ["Alternate depth targets."],
    media: media("wall-forehand", "Wall forehand rhythm"),
    tags: ["technique", "forehand", "wall"],
    relatedExerciseIds: ["wall-alternate-groundstrokes", "forehand-shadow-reps"],
    swapOptions: ["forehand-shadow-reps"]
  }),
  createExercise({
    id: "wall-backhand",
    name: "Backhand against wall",
    category: "technique",
    description: "Build backhand touch, timing, and organized recovery against a wall.",
    instructions: ["Stay compact and patient.", "Reset the paddle in front after every contact."],
    durationSeconds: 120,
    cues: ["Contact in front.", "Stable paddle face."],
    mistakes: ["Late contact.", "Falling backward."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Shadow backhand with pause."],
    progressions: ["Alternate targets or add movement."],
    media: media("wall-backhand", "Wall backhand rhythm"),
    tags: ["technique", "backhand", "wall"],
    relatedExerciseIds: ["wall-alternate-groundstrokes", "backhand-shadow-reps"],
    swapOptions: ["backhand-shadow-reps"]
  }),
  createExercise({
    id: "wall-alternate-groundstrokes",
    name: "Alternate forehand/backhand wall drill",
    category: "technique",
    description: "Blend paddle organization and body position while changing sides quickly.",
    instructions: ["Alternate sides without letting the paddle drop.", "Use the feet to adjust before contact."],
    durationSeconds: 120,
    cues: ["Ready position between contacts.", "Quiet head and stable contact."],
    mistakes: ["Reaching late with the arms.", "Feet stuck to the floor."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Hit two forehands, two backhands."],
    progressions: ["Add directional changes with footwork."],
    media: media("wall-alternate-groundstrokes", "Alternating wall control"),
    tags: ["technique", "forehand", "backhand", "wall"],
    relatedExerciseIds: ["wall-forehand", "wall-backhand"],
    swapOptions: ["forehand-shadow-reps", "backhand-shadow-reps"]
  }),
  createExercise({
    id: "line-hops-front-back",
    name: "Line hops front/back",
    category: "agility",
    description: "Sharpen short-contact quickness and reactive lower-leg stiffness.",
    instructions: ["Hop over an imaginary or taped line front to back.", "Stay light and rhythmic."],
    durationSeconds: 20,
    restSeconds: 30,
    cues: ["Quick contacts.", "Minimal ground time."],
    mistakes: ["Jumping too high.", "Stiff landing."],
    equipment: ["floor line optional"],
    regressions: ["March over line."],
    progressions: ["Single-leg alternating contacts."],
    media: media("line-hops-front-back", "Front-back hops", "animation"),
    tags: ["agility", "speed", "conditioning"],
    relatedExerciseIds: ["line-hops-side-side", "simulated-jump-rope"],
    swapOptions: ["simulated-jump-rope", "line-hops-side-side"]
  }),
  createExercise({
    id: "line-hops-side-side",
    name: "Line hops side/side",
    category: "agility",
    description: "Improve lateral rhythm and reactive feet for kitchen exchanges.",
    instructions: ["Hop laterally over a line with quick contacts.", "Stay centered over the hips."],
    durationSeconds: 20,
    restSeconds: 30,
    cues: ["Quiet shoulders.", "Push and rebound quickly."],
    mistakes: ["Overjumping.", "Feet drifting too wide."],
    equipment: ["floor line optional"],
    regressions: ["Side steps over line."],
    progressions: ["Single-leg side hops."],
    media: media("line-hops-side-side", "Lateral hops", "animation"),
    tags: ["agility", "footwork", "speed"],
    relatedExerciseIds: ["skater-steps", "shadow-side-shuffles"],
    swapOptions: ["skater-steps", "shadow-side-shuffles"]
  }),
  createExercise({
    id: "skater-steps",
    name: "Skater steps",
    category: "agility",
    description: "Build dynamic side push strength with more range than line hops.",
    instructions: ["Step or hop side to side and control the landing.", "Use the arms naturally."],
    durationSeconds: 20,
    restSeconds: 30,
    cues: ["Cover ground without losing posture.", "Own the landing before pushing again."],
    mistakes: ["Crashing into the landing.", "Reaching with the torso instead of the hips."],
    equipment: [],
    regressions: ["Lateral step with tap."],
    progressions: ["Reactive skater bound to stick."],
    media: media("skater-steps", "Side push rhythm"),
    tags: ["agility", "balance", "power"],
    relatedExerciseIds: ["lateral-bound-stick", "single-leg-lateral-reach"],
    swapOptions: ["lateral-bound-stick", "single-leg-lateral-reach"]
  }),
  createExercise({
    id: "single-leg-rdl",
    name: "Single-leg RDL",
    category: "mobility",
    description: "Challenge hamstrings, hips, and balance in a pickleball-ready hinge pattern.",
    instructions: ["Reach the hips back while the free leg extends long.", "Keep the pelvis square."],
    sets: 3,
    reps: "8 each side",
    cues: ["Soft standing knee.", "Long spine."],
    mistakes: ["Opening the hip.", "Rounding the back."],
    equipment: ["kettlebell/dumbbell optional"],
    regressions: ["Toe-down kickstand RDL."],
    progressions: ["Contralateral load with reach."],
    media: media("single-leg-rdl", "Balance hinge"),
    tags: ["balance", "mobility", "strength"],
    relatedExerciseIds: ["step-back-lunge-knee-drive", "single-leg-lateral-reach"],
    swapOptions: ["single-leg-lateral-reach", "lateral-lunge"]
  }),
  createExercise({
    id: "step-back-lunge-knee-drive",
    name: "Step-back lunge to knee drive",
    category: "conditioning",
    description: "Blend control and re-acceleration for better recovery to the middle.",
    instructions: ["Step back under control.", "Drive through the front foot into a balanced knee-up position."],
    sets: 3,
    reps: "8 each side",
    cues: ["Front foot stays rooted.", "Finish tall and stable."],
    mistakes: ["Wobbling at the top.", "Pushing off the toes only."],
    equipment: [],
    regressions: ["Reverse lunge only."],
    progressions: ["Add a small hop on the knee drive."],
    media: media("step-back-lunge-knee-drive", "Recover and drive"),
    tags: ["balance", "conditioning", "footwork"],
    relatedExerciseIds: ["single-leg-rdl", "wide-plant-push-center"],
    swapOptions: ["single-leg-rdl", "lateral-lunge"]
  }),
  createExercise({
    id: "single-leg-lateral-reach",
    name: "Single-leg lateral reach",
    category: "mobility",
    description: "Improve reach capacity and edge control on one leg.",
    instructions: ["Stand on one leg and reach laterally with the free foot or hand.", "Return without wobbling."],
    sets: 3,
    reps: "6 each side",
    cues: ["Hips stay level.", "Own the end position."],
    mistakes: ["Collapsing inward.", "Rushing through the reach."],
    equipment: [],
    regressions: ["Use wall support."],
    progressions: ["Hold a paddle and reach farther."],
    media: media("single-leg-lateral-reach", "Single-leg edge control", "animation"),
    tags: ["balance", "reaching", "mobility"],
    relatedExerciseIds: ["single-leg-rdl", "lunge-reach-paddle"],
    swapOptions: ["lunge-reach-paddle", "lateral-lunge"]
  }),
  createExercise({
    id: "wall-volley-taps",
    name: "Wall volley taps",
    category: "technique",
    description: "Train quick hands and stable paddle face in a compact volley exchange.",
    instructions: ["Stand close enough to keep the stroke compact.", "Tap repeatedly while keeping ready posture."],
    durationSeconds: 30,
    cues: ["Little backswing.", "Recover to ready after each touch."],
    mistakes: ["Wrist flicking.", "Letting the paddle drop."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Catch and tap pattern."],
    progressions: ["Alternate high and low contacts."],
    media: media("wall-volley-taps", "Volley reaction"),
    tags: ["technique", "volley", "wall", "handspeed"],
    relatedExerciseIds: ["forehand-volley-punch-shadow", "backhand-volley-punch-shadow"],
    swapOptions: ["forehand-volley-punch-shadow", "backhand-volley-punch-shadow"]
  }),
  createExercise({
    id: "forehand-volley-punch-shadow",
    name: "Forehand volley punch shadows",
    category: "technique",
    description: "Build forehand volley shape without over-swinging.",
    instructions: ["Start ready and punch forward a few inches.", "Reset after each rep."],
    reps: "10",
    cues: ["Compact motion.", "Shoulder and body, not wrist flick."],
    mistakes: ["Pulling the paddle too far back.", "Contacting late."],
    equipment: ["paddle optional"],
    regressions: ["Isometric hold at contact."],
    progressions: ["Add split-step before each punch."],
    media: media("forehand-volley-punch-shadow", "Forehand volley pattern"),
    tags: ["technique", "volley", "forehand"],
    relatedExerciseIds: ["shadow-volley-punch", "wall-volley-taps"],
    swapOptions: ["wall-volley-taps", "shadow-volley-punch"]
  }),
  createExercise({
    id: "backhand-volley-punch-shadow",
    name: "Backhand volley punch shadows",
    category: "technique",
    description: "Train the backhand volley with organized elbows and a stable face.",
    instructions: ["Keep the paddle in front.", "Punch through the line and recover."],
    reps: "10",
    cues: ["Compact motion.", "Stay balanced through the block."],
    mistakes: ["Elbows drifting too wide.", "Flicking with the wrist."],
    equipment: ["paddle optional"],
    regressions: ["Pause at contact."],
    progressions: ["Add reactive split-step start."],
    media: media("backhand-volley-punch-shadow", "Backhand volley pattern"),
    tags: ["technique", "volley", "backhand"],
    relatedExerciseIds: ["shadow-volley-punch", "wall-volley-taps"],
    swapOptions: ["wall-volley-taps", "shadow-volley-punch"]
  }),
  createExercise({
    id: "ready-position-resets",
    name: "Ready-position resets",
    category: "technique",
    description: "Reinforce paddle height and body shape between quick exchanges.",
    instructions: ["Reset feet and paddle after every rep.", "Hold the ready position for one beat."],
    reps: "10",
    cues: ["Paddle in front of the chest.", "Low athletic base."],
    mistakes: ["Paddle too low.", "Weight drifting to the heels."],
    equipment: ["paddle optional"],
    regressions: ["Static ready holds."],
    progressions: ["Split-step into each reset."],
    media: media("ready-position-resets", "Ready reset", "animation"),
    tags: ["technique", "footwork", "volley"],
    relatedExerciseIds: ["split-step-bounce", "shadow-volley-punch"],
    swapOptions: ["split-step-bounce"]
  }),
  createExercise({
    id: "soft-forehand-dinks-wall",
    name: "Soft forehand dinks to target",
    category: "technique",
    description: "Develop touch and height control on the forehand side.",
    instructions: ["Use a gentle lift from the legs.", "Aim for a soft arc to a small target."],
    durationSeconds: 120,
    cues: ["Stay low.", "Stable paddle face.", "Lift and place, not hit."],
    mistakes: ["Big backswing.", "Standing up through contact."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Shadow forehand dink pattern."],
    progressions: ["Change depth and tempo."],
    media: media("soft-forehand-dinks-wall", "Forehand dink touch"),
    tags: ["technique", "dink", "forehand", "wall"],
    relatedExerciseIds: ["soft-backhand-dinks-wall", "shadow-dink-pattern"],
    swapOptions: ["shadow-dink-pattern"]
  }),
  createExercise({
    id: "soft-backhand-dinks-wall",
    name: "Soft backhand dinks to target",
    category: "technique",
    description: "Train compact backhand touch with low posture and stable face.",
    instructions: ["Stay low and guide the ball softly.", "Recover to ready after each rep."],
    durationSeconds: 120,
    cues: ["Contact out in front.", "Use the legs more than the arm."],
    mistakes: ["Popping the ball from the wrist.", "Paddle face changing at impact."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Shadow backhand dink reps."],
    progressions: ["Alternate width targets."],
    media: media("soft-backhand-dinks-wall", "Backhand dink touch"),
    tags: ["technique", "dink", "backhand", "wall"],
    relatedExerciseIds: ["alternating-dinks-wall", "shadow-dink-pattern"],
    swapOptions: ["shadow-dink-pattern"]
  }),
  createExercise({
    id: "alternating-dinks-wall",
    name: "Alternating dinks",
    category: "technique",
    description: "Shift between sides while keeping posture and touch consistent.",
    instructions: ["Alternate forehand and backhand softly.", "Recover to neutral between contacts."],
    durationSeconds: 120,
    cues: ["Stay low.", "Do not rush the next touch."],
    mistakes: ["Getting tall between hits.", "Overhitting off one side."],
    equipment: ["wall access", "paddle", "ball"],
    regressions: ["Two forehand then two backhand dinks."],
    progressions: ["Add a lateral shuffle before each touch."],
    media: media("alternating-dinks-wall", "Alternating dink control"),
    tags: ["technique", "dink", "wall"],
    relatedExerciseIds: ["soft-forehand-dinks-wall", "soft-backhand-dinks-wall"],
    swapOptions: ["shadow-dink-pattern"]
  }),
  createExercise({
    id: "step-in-dink-recover",
    name: "Step-in dink, recover, step-in dink",
    category: "technique",
    description: "Connect footwork timing with controlled kitchen touch.",
    instructions: ["Step in softly to contact.", "Recover to ready before repeating."],
    durationSeconds: 120,
    cues: ["Quiet feet.", "Stable paddle face the whole time."],
    mistakes: ["Reaching without the feet.", "Overcommitting weight forward."],
    equipment: ["wall access optional", "paddle optional"],
    regressions: ["Stationary shadow dink pattern."],
    progressions: ["Randomize forehand or backhand entry."],
    media: media("step-in-dink-recover", "Dink footwork pattern"),
    tags: ["technique", "dink", "footwork"],
    relatedExerciseIds: ["shadow-dink-pattern", "alternating-dinks-wall"],
    swapOptions: ["shadow-dink-pattern"]
  }),
  createExercise({
    id: "shadow-dink-pattern",
    name: "Shadow dink pattern",
    category: "technique",
    description: "No-wall pattern focused on low posture, touch mechanics, and recovery.",
    instructions: ["Shadow forehand and backhand dinks from a low stance.", "Recover to ready after each rep."],
    reps: "12 alternating reps",
    cues: ["Stable paddle face.", "Slight lift from the legs.", "Think soft hands."],
    mistakes: ["Standing tall.", "Using a big arm swing."],
    equipment: ["paddle optional"],
    regressions: ["Static forehand-only or backhand-only reps."],
    progressions: ["Add a split-step before each contact."],
    media: media("shadow-dink-pattern", "No-wall dink pattern", "animation"),
    tags: ["technique", "dink", "footwork"],
    relatedExerciseIds: ["soft-forehand-dinks-wall", "step-in-dink-recover"],
    swapOptions: ["soft-forehand-dinks-wall", "soft-backhand-dinks-wall"]
  }),
  createExercise({
    id: "calf-stretch",
    name: "Calf stretch",
    category: "recovery",
    description: "Restore ankle range after hopping and quick-change work.",
    instructions: ["Drive the heel down and knee forward gently.", "Breathe and hold."],
    reps: "45 sec each",
    cues: ["Keep the heel grounded.", "Do not force range."],
    mistakes: ["Foot collapsing inward.", "Holding the breath."],
    equipment: [],
    regressions: ["Wall-supported lean."],
    progressions: ["Bent-knee then straight-knee versions."],
    media: media("calf-stretch", "Lower-leg recovery", "animation"),
    tags: ["recovery", "mobility"],
    relatedExerciseIds: ["hamstring-stretch", "wrist-mobility"],
    swapOptions: ["hamstring-stretch"]
  }),
  createExercise({
    id: "hip-flexor-stretch",
    name: "Hip flexor stretch",
    category: "recovery",
    description: "Unload the front of the hips after repeated athletic stance work.",
    instructions: ["Set a half-kneeling lunge.", "Tuck the pelvis and gently shift forward."],
    reps: "45 sec each",
    cues: ["Glute squeeze on the back leg.", "Stay tall through the chest."],
    mistakes: ["Arching the low back.", "Leaning forward excessively."],
    equipment: [],
    regressions: ["Shorter lunge stance."],
    progressions: ["Add overhead reach and side bend."],
    media: media("hip-flexor-stretch", "Hip recovery", "animation"),
    tags: ["recovery", "mobility"],
    relatedExerciseIds: ["worlds-greatest-stretch", "ninety-ninety-switches"],
    swapOptions: ["worlds-greatest-stretch"]
  }),
  createExercise({
    id: "ninety-ninety-switches",
    name: "90/90 hip switches",
    category: "mobility",
    description: "Restore hip rotation for reaching and rotational stroke mechanics.",
    instructions: ["Sit in 90/90 position.", "Switch sides smoothly without using the hands if possible."],
    reps: "10 reps",
    cues: ["Rotate from the hips.", "Stay tall."],
    mistakes: ["Collapsing the torso.", "Rushing past sticky ranges."],
    equipment: [],
    regressions: ["Use the hands behind you."],
    progressions: ["Lift to half-kneeling between switches."],
    media: media("ninety-ninety-switches", "Hip rotation flow", "animation"),
    tags: ["mobility", "recovery", "rotation"],
    relatedExerciseIds: ["thoracic-rotation", "hip-circles"],
    swapOptions: ["hip-circles"]
  }),
  createExercise({
    id: "thoracic-rotation",
    name: "Thoracic rotation",
    category: "mobility",
    description: "Improve rib-cage rotation for smoother forehands, backhands, and counters.",
    instructions: ["Set up on hands and knees or side-lying.", "Rotate the chest open with a long exhale."],
    reps: "8 each side",
    cues: ["Rotate through the upper back.", "Keep the hips quiet."],
    mistakes: ["Twisting only the shoulders.", "Holding the breath."],
    equipment: [],
    regressions: ["Smaller range with pause."],
    progressions: ["Add reach-under and open flow."],
    media: media("thoracic-rotation", "Upper-back rotation", "animation"),
    tags: ["mobility", "recovery", "rotational"],
    relatedExerciseIds: ["band-woodchop", "worlds-greatest-stretch"],
    swapOptions: ["worlds-greatest-stretch"]
  }),
  createExercise({
    id: "hamstring-stretch",
    name: "Hamstring stretch",
    category: "recovery",
    description: "Restore posterior-chain length after hinges, lunges, and court posture work.",
    instructions: ["Hinge gently at the hips while keeping a long spine.", "Breathe into the hold."],
    reps: "45 sec each",
    cues: ["Find stretch without rounding hard.", "Relax the neck and shoulders."],
    mistakes: ["Yanking into range.", "Locking the knee hard."],
    equipment: [],
    regressions: ["Bent-knee version."],
    progressions: ["Add ankle pumps in the hold."],
    media: media("hamstring-stretch", "Posterior chain recovery", "animation"),
    tags: ["recovery", "mobility"],
    relatedExerciseIds: ["calf-stretch", "adductor-rock-backs"],
    swapOptions: ["adductor-rock-backs"]
  }),
  createExercise({
    id: "adductor-rock-backs",
    name: "Adductor rock backs",
    category: "mobility",
    description: "Open the groin and hips for wider stable reaches.",
    instructions: ["Set one leg out to the side.", "Rock the hips back until you feel the stretch."],
    reps: "10 reps",
    cues: ["Long spine.", "Control the motion."],
    mistakes: ["Dropping the chest.", "Pushing into pain."],
    equipment: [],
    regressions: ["Shorter range."],
    progressions: ["Add reach through and rotate."],
    media: media("adductor-rock-backs", "Inner thigh mobility", "animation"),
    tags: ["mobility", "recovery", "reaching"],
    relatedExerciseIds: ["lateral-lunge", "hamstring-stretch"],
    swapOptions: ["lateral-lunge"]
  }),
  createExercise({
    id: "shoulder-external-rotation-band",
    name: "Shoulder external rotation with band",
    category: "recovery",
    description: "Give the shoulders light cuff work after repetitive paddle positions.",
    instructions: ["Keep the elbow pinned near the ribcage.", "Rotate the forearm outward with control."],
    reps: "12 reps",
    cues: ["Small clean range.", "Do not shrug."],
    mistakes: ["Elbow drifting away.", "Swinging through the rep."],
    equipment: ["resistance band"],
    regressions: ["Towel roll support under elbow."],
    progressions: ["Longer isometric hold at end range."],
    media: media("shoulder-external-rotation-band", "Shoulder reset"),
    tags: ["recovery", "shoulders", "mobility"],
    relatedExerciseIds: ["arm-circles", "wrist-mobility"],
    swapOptions: ["arm-circles"]
  }),
  createExercise({
    id: "wrist-mobility",
    name: "Wrist mobility",
    category: "recovery",
    description: "Reduce stiffness from paddle grip and wall work.",
    instructions: ["Move through flexion, extension, circles, and gentle weight shifts.", "Stay below pain."],
    durationSeconds: 60,
    cues: ["Small clean motions.", "Relax the forearms."],
    mistakes: ["Forcing end range.", "Dumping full body weight into the wrists too soon."],
    equipment: [],
    regressions: ["Air circles only."],
    progressions: ["Quadruped loading shifts."],
    media: media("wrist-mobility", "Wrist reset", "animation"),
    tags: ["recovery", "mobility", "paddle-health"],
    relatedExerciseIds: ["shoulder-external-rotation-band", "calf-stretch"],
    swapOptions: ["shoulder-external-rotation-band"]
  }),
  createExercise({
    id: "overhead-prep-shadow",
    name: "Overhead prep movements",
    category: "technique",
    description: "Practice early turn and balanced overhead preparation.",
    instructions: ["Turn the shoulders early and point the non-dominant side.", "Set the feet before the swing."],
    reps: "10",
    cues: ["Get the paddle up early.", "Stay side-on before contact."],
    mistakes: ["Waiting too long to turn.", "Jumping backward."],
    equipment: ["paddle optional"],
    regressions: ["Preparation only, no swing."],
    progressions: ["Add recovery step after the prep."],
    media: media("overhead-prep-shadow", "Overhead preparation"),
    tags: ["technique", "overhead", "footwork"],
    relatedExerciseIds: ["wide-reach-recover-shadow", "split-step-sprint"],
    swapOptions: ["wide-reach-recover-shadow"]
  }),
  createExercise({
    id: "wide-reach-recover-shadow",
    name: "Wide reach and recover movements",
    category: "technique",
    description: "Rehearse reaching with the paddle, then recovering to a central base.",
    instructions: ["Reach wide with a strong base.", "Push back to center quickly and under control."],
    reps: "10",
    cues: ["Reach with the feet first.", "Recover immediately after the finish."],
    mistakes: ["Overreaching from the torso.", "Standing up during recovery."],
    equipment: ["paddle optional"],
    regressions: ["Static reach holds."],
    progressions: ["Add split-step before the reach."],
    media: media("wide-reach-recover-shadow", "Wide-ball recovery pattern"),
    tags: ["technique", "reaching", "footwork"],
    relatedExerciseIds: ["wide-plant-push-center", "lunge-reach-paddle"],
    swapOptions: ["wide-plant-push-center", "lunge-reach-paddle"]
  }),
  createExercise({
    id: "split-step-sprint",
    name: "Split step + sprint 2-3 steps",
    category: "speed",
    description: "Build true first-step pop out of a split-step start.",
    instructions: ["Split step, then accelerate for two or three fast steps.", "Reset fully between efforts."],
    durationSeconds: 10,
    restSeconds: 20,
    cues: ["Violent first push.", "Stay low over the feet."],
    mistakes: ["Standing up on the first step.", "Too many steps instead of sharp acceleration."],
    equipment: [],
    regressions: ["Split step + two quick marches."],
    progressions: ["Random directional cue."],
    media: media("split-step-sprint", "First-step burst", "animation"),
    tags: ["speed", "agility", "footwork"],
    relatedExerciseIds: ["split-step-to-shuffle", "shuffle-shuffle-touch"],
    swapOptions: ["split-step-to-shuffle", "line-hops-front-back"]
  } as Exercise),
  createExercise({
    id: "shuffle-shuffle-touch",
    name: "Shuffle-shuffle-touch",
    category: "speed",
    description: "Short sharp lateral coverage pattern with a low touch target.",
    instructions: ["Shuffle twice to a side and touch a target line.", "Recover under control before repeating."],
    durationSeconds: 15,
    restSeconds: 20,
    cues: ["Stay level through the chest.", "Push back from the outside leg."],
    mistakes: ["Clicking feet together.", "Touching by bending the back only."],
    equipment: ["floor line optional"],
    regressions: ["Single shuffle then touch."],
    progressions: ["Random direction touches."],
    media: media("shuffle-shuffle-touch", "Lateral touch drill", "animation"),
    tags: ["speed", "agility", "reaching"],
    relatedExerciseIds: ["split-step-to-shuffle", "wide-plant-push-center"],
    swapOptions: ["split-step-to-shuffle", "shadow-side-shuffles"]
  } as Exercise),
  createExercise({
    id: "lunge-reach-paddle",
    name: "Lunge and reach with paddle",
    category: "mobility",
    description: "Practice reaching posture with better lower-body support.",
    instructions: ["Lunge out to the side or diagonal.", "Reach with the paddle while staying stacked."],
    sets: 3,
    reps: "6 each side",
    cues: ["Reach from the legs first.", "Keep the chest quiet."],
    mistakes: ["Folding from the waist.", "Letting the front knee cave."],
    equipment: ["paddle optional"],
    regressions: ["Smaller lunge range."],
    progressions: ["Reach then push back quickly to center."],
    media: media("lunge-reach-paddle", "Reach posture"),
    tags: ["mobility", "balance", "reaching"],
    relatedExerciseIds: ["lateral-lunge", "wide-plant-push-center"],
    swapOptions: ["lateral-lunge", "single-leg-lateral-reach"]
  }),
  createExercise({
    id: "wide-plant-push-center",
    name: "Wide plant and push back to center",
    category: "agility",
    description: "Train the exact plant-and-recover action used after chasing wide balls.",
    instructions: ["Plant outside the body line.", "Push back sharply to your base."],
    sets: 3,
    reps: "6 each side",
    cues: ["Strong outside edge.", "Recover before relaxing."],
    mistakes: ["Falling over the plant foot.", "Waiting before pushing back."],
    equipment: ["paddle optional"],
    regressions: ["Walk out and recover."],
    progressions: ["Add forehand or backhand shadow on the plant."],
    media: media("wide-plant-push-center", "Push back to base"),
    tags: ["agility", "recovery", "reaching"],
    relatedExerciseIds: ["crossover-recovery-step", "wide-reach-recover-shadow"],
    swapOptions: ["crossover-recovery-step", "lateral-lunge"]
  }),
  createExercise({
    id: "band-woodchop",
    name: "Band woodchop high to low",
    category: "power",
    description: "Train loaded rotation from the upper outside shoulder to opposite hip.",
    instructions: ["Start tall and loaded.", "Rotate and chop down without collapsing."],
    sets: 3,
    reps: "10 each side",
    cues: ["Move through the trunk.", "Control the return."],
    mistakes: ["Pulling only with the arms.", "Twisting the knees aggressively."],
    equipment: ["resistance band"],
    regressions: ["Half-kneeling chop."],
    progressions: ["Faster down phase with pause at finish."],
    media: media("band-woodchop", "High-low chop"),
    tags: ["power", "rotational", "core"],
    relatedExerciseIds: ["band-lift", "band-rotational-chop"],
    swapOptions: ["band-lift", "band-rotational-chop"]
  }),
  createExercise({
    id: "band-lift",
    name: "Band lift low to high",
    category: "power",
    description: "Train upward rotational force and trunk control from the ground.",
    instructions: ["Load low near the outside hip.", "Lift diagonally without losing the feet."],
    sets: 3,
    reps: "10 each side",
    cues: ["Hips and rib cage work together.", "Stay tall at the finish."],
    mistakes: ["Shrugging the shoulders.", "Arching back at the top."],
    equipment: ["resistance band"],
    regressions: ["Half-kneeling lift."],
    progressions: ["Split-stance lift with faster concentric."],
    media: media("band-lift", "Low-high lift"),
    tags: ["power", "rotational", "core"],
    relatedExerciseIds: ["band-woodchop", "half-kneeling-band-press-rotation"],
    swapOptions: ["band-woodchop", "half-kneeling-band-press-rotation"]
  }),
  createExercise({
    id: "pallof-press-hold",
    name: "Pallof press hold",
    category: "recovery",
    description: "Improve anti-rotation control so power transfers cleanly into the paddle.",
    instructions: ["Press the band out in front and hold.", "Resist being pulled into rotation."],
    sets: 3,
    reps: "20 sec each side",
    cues: ["Ribs stacked over hips.", "Glutes on."],
    mistakes: ["Rotating toward the anchor.", "Holding the breath."],
    equipment: ["resistance band"],
    regressions: ["Shorter lever hold."],
    progressions: ["Split-stance hold with march."],
    media: media("pallof-press-hold", "Anti-rotation brace"),
    tags: ["core", "rotational", "balance"],
    relatedExerciseIds: ["dead-bug", "half-kneeling-band-press-rotation"],
    swapOptions: ["dead-bug", "half-kneeling-band-press-rotation"]
  }),
  createExercise({
    id: "shadow-forehand-drive",
    name: "Shadow forehand drives",
    category: "technique",
    description: "Train a more assertive forehand drive without overswinging.",
    instructions: ["Load from the legs and hip turn.", "Drive through contact and recover fast."],
    reps: "10",
    cues: ["Hips start the motion.", "Contact in front.", "Recover quickly after contact."],
    mistakes: ["Arm-only swing.", "Finishing too big."],
    equipment: ["paddle optional"],
    regressions: ["Forehand shadow reps at 70 percent speed."],
    progressions: ["Add shuffle into the drive."],
    media: media("shadow-forehand-drive", "Forehand drive pattern"),
    tags: ["technique", "forehand", "drive"],
    relatedExerciseIds: ["forehand-shadow-reps", "shadow-forehand-hip-turn"],
    swapOptions: ["forehand-shadow-reps"]
  }),
  createExercise({
    id: "shadow-backhand-drive",
    name: "Shadow backhand drives",
    category: "technique",
    description: "Practice a compact backhand drive with clean load and recovery.",
    instructions: ["Set early and drive through the line.", "Finish organized and return to ready."],
    reps: "10",
    cues: ["Load from the legs.", "Stable wrist.", "Do not over-swing."],
    mistakes: ["Late contact.", "Falling backward off the shot."],
    equipment: ["paddle optional"],
    regressions: ["Backhand shadow reps with pause."],
    progressions: ["Add a recovery shuffle after contact."],
    media: media("shadow-backhand-drive", "Backhand drive pattern"),
    tags: ["technique", "backhand", "drive"],
    relatedExerciseIds: ["backhand-shadow-reps", "counter-block-backhand"],
    swapOptions: ["backhand-shadow-reps"]
  }),
  createExercise({
    id: "counter-block-forehand",
    name: "Compact counter blocks forehand",
    category: "technique",
    description: "Train short forehand counters for fast exchanges at the kitchen line.",
    instructions: ["Use a short punch through the line of the ball.", "Recover the paddle immediately."],
    reps: "10",
    cues: ["Stable wrist.", "Keep elbows organized.", "Stay balanced."],
    mistakes: ["Big backswing.", "Overreaching with the shoulders."],
    equipment: ["paddle optional"],
    regressions: ["Forehand volley punch shadows."],
    progressions: ["Add split-step reaction before the counter."],
    media: media("counter-block-forehand", "Forehand counter"),
    tags: ["technique", "forehand", "volley", "counter"],
    relatedExerciseIds: ["forehand-volley-punch-shadow", "wall-volley-taps"],
    swapOptions: ["forehand-volley-punch-shadow", "wall-volley-taps"]
  }),
  createExercise({
    id: "counter-block-backhand",
    name: "Compact counter blocks backhand",
    category: "technique",
    description: "Practice backhand counter shape with minimal motion and fast recovery.",
    instructions: ["Punch straight through the contact line.", "Reset the paddle at once."],
    reps: "10",
    cues: ["Short stroke.", "Stable wrist.", "Stay balanced."],
    mistakes: ["Letting the elbow drift.", "Flipping the wrist."],
    equipment: ["paddle optional"],
    regressions: ["Backhand volley punch shadows."],
    progressions: ["Add random forehand/backhand callouts."],
    media: media("counter-block-backhand", "Backhand counter"),
    tags: ["technique", "backhand", "volley", "counter"],
    relatedExerciseIds: ["backhand-volley-punch-shadow", "wall-volley-taps"],
    swapOptions: ["backhand-volley-punch-shadow", "wall-volley-taps"]
  }),
  createExercise({
    id: "squat-to-press",
    name: "Squat-to-press or bodyweight squats",
    category: "conditioning",
    description: "Simple whole-body conditioning move for pickleball circuit days.",
    instructions: ["Squat with control and drive up tall.", "If loading overhead, keep the ribs down."],
    reps: "10",
    cues: ["Smooth depth.", "Drive hard through the floor."],
    mistakes: ["Knees collapsing inward.", "Pressing with an arched back."],
    equipment: ["kettlebell/dumbbell optional"],
    regressions: ["Bodyweight squat only."],
    progressions: ["Add press with moderate load."],
    media: media("squat-to-press", "Squat circuit move"),
    tags: ["conditioning", "power", "strength"],
    relatedExerciseIds: ["push-ups", "kettlebell-swing"],
    swapOptions: ["squat-jump", "glute-bridge"]
  }),
  createExercise({
    id: "push-ups",
    name: "Push-ups",
    category: "conditioning",
    description: "Build upper-body support for paddle stability and posture.",
    instructions: ["Keep the body straight.", "Lower with control and press the floor away."],
    reps: "8",
    cues: ["Hands under shoulders.", "Exhale on the press."],
    mistakes: ["Sagging hips.", "Flaring elbows too wide."],
    equipment: [],
    regressions: ["Incline push-up on a bench or wall."],
    progressions: ["Tempo push-up or shoulder tap."],
    media: media("push-ups", "Upper-body support"),
    tags: ["conditioning", "strength"],
    relatedExerciseIds: ["squat-to-press", "burpee-athletic-stance"],
    swapOptions: ["ready-position-resets"]
  }),
  createExercise({
    id: "burpee-athletic-stance",
    name: "Burpee to athletic stance",
    category: "conditioning",
    description: "Conditioning option that still finishes in a ready-to-play base.",
    instructions: ["Use a modified burpee or fast step-back.", "Land in a stable athletic stance."],
    reps: "6",
    cues: ["Smooth pace beats sloppy speed.", "Own the final stance each rep."],
    mistakes: ["Crashing to the floor.", "Landing tall and loose."],
    equipment: [],
    regressions: ["Fast step-backs."],
    progressions: ["Add a split-step on landing."],
    media: media("burpee-athletic-stance", "Conditioning finish"),
    tags: ["conditioning", "speed", "recovery"],
    relatedExerciseIds: ["fast-step-backs", "split-step-bounce"],
    swapOptions: ["fast-step-backs", "split-step-bounce"]
  }),
  createExercise({
    id: "fast-step-backs",
    name: "Fast step-backs",
    category: "conditioning",
    description: "Low-impact option to raise heart rate without full burpees.",
    instructions: ["Step back fast into plank and return to athletic stance.", "Stay tall at the finish."],
    reps: "6",
    cues: ["Quick feet, quiet trunk.", "Finish ready to move."],
    mistakes: ["Hips sagging in plank.", "Rushing into a sloppy stance."],
    equipment: [],
    regressions: ["Slow alternating step-backs."],
    progressions: ["Add a jump back in."],
    media: media("fast-step-backs", "Low-impact burpee option"),
    tags: ["conditioning", "recovery", "speed"],
    relatedExerciseIds: ["burpee-athletic-stance", "split-step-bounce"],
    swapOptions: ["burpee-athletic-stance", "split-step-bounce"]
  }),
  createExercise({
    id: "play-session",
    name: "Play or drill session",
    category: "conditioning",
    description: "Use live play or a focused home drill block to transfer training to the game.",
    instructions: ["Choose match play, wall drills, or focused shot practice.", "Log one tactical or technical takeaway after."],
    durationSeconds: 1800,
    cues: ["Keep one simple focus.", "Review what held up under speed."],
    mistakes: ["Trying to fix everything at once.", "Skipping the review note."],
    equipment: ["paddle", "ball", "wall access optional"],
    regressions: ["20-minute wall or shadow drill session."],
    progressions: ["Game-like pressure scoring or target goals."],
    media: media("play-session", "Transfer day"),
    tags: ["conditioning", "play", "technique"],
    relatedExerciseIds: ["wall-volley-taps", "alternating-dinks-wall"],
    swapOptions: ["wall-volley-taps", "alternating-dinks-wall", "shadow-dink-pattern"]
  }),
  createExercise({
    id: "light-mobility-reset",
    name: "Light mobility reset",
    category: "recovery",
    description: "Easy restoration day to stay loose without adding fatigue.",
    instructions: ["Choose 3 to 5 recovery drills and move lightly.", "Stop while you still feel fresh."],
    durationSeconds: 900,
    cues: ["Leave the session feeling better.", "Breathe and move slowly."],
    mistakes: ["Turning recovery into another workout.", "Skipping because it seems too easy."],
    equipment: [],
    regressions: ["Five-minute recovery check-in only."],
    progressions: ["Add a short easy walk."],
    media: media("light-mobility-reset", "Recovery flow", "animation"),
    tags: ["recovery", "mobility"],
    relatedExerciseIds: ["hip-flexor-stretch", "thoracic-rotation"],
    swapOptions: ["hip-flexor-stretch", "thoracic-rotation", "calf-stretch"]
  })
];

export const exerciseMap = Object.fromEntries(exercises.map((exercise) => [exercise.id, exercise])) as Record<
  string,
  Exercise
>;

export const techniqueSkills: TechniqueSkill[] = [
  {
    id: "forehand",
    name: "Forehand",
    cues: [
      "Athletic base before the ball arrives.",
      "Paddle prepared early with a clear unit turn.",
      "Step to the ball and contact slightly in front.",
      "Finish under control and recover to ready."
    ],
    commonMistakes: [
      "Late paddle prep.",
      "Swinging mostly with the arm.",
      "Contact drifting too close to the body.",
      "Finishing off balance."
    ],
    drills: ["forehand-shadow-reps", "shadow-forehand-hip-turn", "wall-forehand"],
    media: media("skill-forehand", "Forehand learning clip"),
    selfCheckpoints: [
      "I turned my shoulders before the swing.",
      "I stepped into contact instead of reaching.",
      "My finish was balanced and compact."
    ],
    shadowSuggestions: ["Pause at the loaded position.", "Blend split-step, shuffle, and swing on later weeks."],
    wallSuggestions: ["Use a small chest-high target.", "Keep the rally compact and repeatable before adding pace."],
    recordChecklistFront: [
      "Does the paddle prep happen before the forward swing?",
      "Do the hips and shoulders rotate together?",
      "Do I stay balanced after the finish?"
    ],
    recordChecklistSide: [
      "Is contact happening slightly in front of the body?",
      "Am I stepping or loading before the swing?",
      "Is the finish controlled instead of over-rotated?"
    ]
  },
  {
    id: "backhand",
    name: "Backhand",
    cues: [
      "Turn the shoulders early.",
      "Set the paddle face early and keep the wrist stable.",
      "Make contact in front of the body.",
      "Finish balanced and recover immediately."
    ],
    commonMistakes: [
      "Late shoulder turn.",
      "Paddle face wandering during contact.",
      "Wrist flicking to create pace.",
      "Falling backward through the finish."
    ],
    drills: ["backhand-shadow-reps", "shadow-backhand-swing", "wall-backhand"],
    media: media("skill-backhand", "Backhand learning clip"),
    selfCheckpoints: [
      "My shoulders started the motion.",
      "My paddle stayed in front through contact.",
      "I could recover quickly after the rep."
    ],
    shadowSuggestions: ["Use pause reps at setup and contact.", "Add a recovery shuffle after every swing."],
    wallSuggestions: ["Keep the wall rally compact.", "Use the feet to create spacing instead of reaching."],
    recordChecklistFront: [
      "Is the paddle set early?",
      "Is the swing compact and organized?",
      "Do I stay centered over my base?"
    ],
    recordChecklistSide: [
      "Is the contact point in front?",
      "Does the torso rotate smoothly?",
      "Is my finish short enough for quick recovery?"
    ]
  },
  {
    id: "dinks",
    name: "Dinks",
    cues: [
      "Stay low and stable through the legs.",
      "Use a gentle lift instead of a hit.",
      "Keep the paddle face stable and contact out front.",
      "Recover to ready after each touch."
    ],
    commonMistakes: [
      "Standing up through contact.",
      "Using a big arm swing.",
      "Changing the paddle face at impact.",
      "Staying planted after the shot."
    ],
    drills: ["shadow-dink-pattern", "soft-forehand-dinks-wall", "alternating-dinks-wall"],
    media: media("skill-dinks", "Dink learning clip"),
    selfCheckpoints: [
      "My posture stayed low the whole rep.",
      "The paddle face stayed quiet.",
      "I recovered to a balanced base after the touch."
    ],
    shadowSuggestions: ["Alternate forehand and backhand dinks while staying low.", "Use pause reps to check paddle face."],
    wallSuggestions: ["Aim for soft arcs and repeatable height.", "Do not add pace until touch is consistent."],
    recordChecklistFront: [
      "Am I staying low from setup to finish?",
      "Do I recover my paddle to ready quickly?",
      "Is the movement compact?"
    ],
    recordChecklistSide: [
      "Is contact out in front?",
      "Do the legs help lift the ball?",
      "Does the body stay quiet and balanced?"
    ]
  },
  {
    id: "volleys",
    name: "Volleys",
    cues: [
      "Compact motion with little backswing.",
      "Contact in front.",
      "Use shoulder and body, not wrist flick.",
      "Recover the paddle after every touch."
    ],
    commonMistakes: [
      "Taking a full swing at the volley.",
      "Dropping the paddle after contact.",
      "Contacting late or too close to the body.",
      "Overusing the wrist."
    ],
    drills: ["wall-volley-taps", "forehand-volley-punch-shadow", "backhand-volley-punch-shadow"],
    media: media("skill-volleys", "Volley learning clip"),
    selfCheckpoints: [
      "The paddle stayed in front between contacts.",
      "My motion was short and direct.",
      "I stayed balanced during quick exchanges."
    ],
    shadowSuggestions: ["Reset to ready after each punch.", "Blend split-step timing into the start of every rep."],
    wallSuggestions: ["Stand close enough that compact motion is required.", "Use target changes without increasing swing size."],
    recordChecklistFront: [
      "Is my ready position consistent?",
      "Are my elbows organized and in front?",
      "Do I stay low through fast exchanges?"
    ],
    recordChecklistSide: [
      "Is there very little backswing?",
      "Is contact in front of my chest?",
      "Do I recover immediately after each volley?"
    ]
  },
  {
    id: "wide-recovery",
    name: "Reaching / Wide Ball Recovery",
    cues: [
      "Move the feet first, then reach.",
      "Plant outside the body line and stabilize.",
      "Push back to center quickly after the reach.",
      "Keep the chest stacked instead of folding."
    ],
    commonMistakes: [
      "Reaching only with the upper body.",
      "Planting too narrow and falling off balance.",
      "Waiting too long to recover.",
      "Standing up during the push back."
    ],
    drills: ["wide-reach-recover-shadow", "wide-plant-push-center", "lunge-reach-paddle"],
    media: media("skill-wide-recovery", "Wide ball recovery clip"),
    selfCheckpoints: [
      "I used my feet before I reached.",
      "I felt stable on the outside plant foot.",
      "I recovered quickly instead of watching the shot."
    ],
    shadowSuggestions: ["Pause on the reach and on the recovery push.", "Add random forehand or backhand reach calls in week 4."],
    wallSuggestions: ["Use shadow or wall feeds that force you to move first.", "Emphasize fast recovery to center after every rep."],
    recordChecklistFront: [
      "Do I widen my base before the reach?",
      "Is the knee stable on the plant foot?",
      "Can I push back to center cleanly?"
    ],
    recordChecklistSide: [
      "Am I folding from the hips too much?",
      "Do I stay stacked enough to recover?",
      "Is my return step immediate after contact?"
    ]
  },
  {
    id: "split-step-footwork",
    name: "Split Step / Footwork Basics",
    cues: [
      "Bounce into a split step just before movement.",
      "Land ready to push in either direction.",
      "Keep the feet under the hips and the chest level.",
      "Recover to a usable base after every movement."
    ],
    commonMistakes: [
      "Timing the split step too late.",
      "Landing too wide or too tall.",
      "Crossing the feet when a shuffle would be better.",
      "Forgetting to reset after the move."
    ],
    drills: ["split-step-bounce", "split-step-to-shuffle", "split-step-sprint"],
    media: media("skill-split-step-footwork", "Footwork basics clip"),
    selfCheckpoints: [
      "My first step feels reactive, not delayed.",
      "I can move laterally without crossing too soon.",
      "I return to ready posture after each rep."
    ],
    shadowSuggestions: ["Use mirror work for timing.", "Add a verbal or visual cue before each move."],
    wallSuggestions: ["Combine split-step timing with volleys or dinks when wall space allows."],
    recordChecklistFront: [
      "Are my feet landing under control in the split step?",
      "Do I stay low enough to move either way?",
      "Am I resetting to a balanced base after moving?"
    ],
    recordChecklistSide: [
      "Is the chest staying level instead of popping up?",
      "Do I move quickly out of the split step?",
      "Am I balanced when I stop?"
    ]
  }
];

export const techniqueSkillMap = Object.fromEntries(
  techniqueSkills.map((skill) => [skill.id, skill])
) as Record<string, TechniqueSkill>;

const warmupIds = [
  "march-jog-place",
  "simulated-jump-rope",
  "hip-circles",
  "arm-circles",
  "worlds-greatest-stretch",
  "lateral-lunge",
  "glute-bridge",
  "dead-bug",
  "split-step-bounce",
  "shadow-side-shuffles",
  "split-step-shuffle-right-left",
  "shadow-forehand-swing",
  "shadow-backhand-swing",
  "shadow-volley-punch"
];

const progressionThemes = {
  1: {
    theme: "Week 1 is about learning movement shapes and repeatable shot mechanics at moderate intensity.",
    focus: "Learn the positions, own the landings, and keep effort at a sustainable seven out of ten."
  },
  2: {
    theme: "Week 2 adds one round to most repeatable drill blocks and asks for slightly faster feet.",
    focus: "Keep technique quality high while adding a little more volume and pace."
  },
  3: {
    theme: "Week 3 increases explosiveness and trims some rest while protecting mechanics.",
    focus: "Move faster with intent, but stop a set when quality drops."
  },
  4: {
    theme: "Week 4 becomes more game-like with random direction changes, combined movement plus swings, and video review.",
    focus: "React, recover, and review what carries into real pickleball timing."
  }
} as const;

const cloneBlock = (block: WorkoutBlock, weekNumber: number): WorkoutBlock => {
  const extraRound = weekNumber >= 2 && typeof block.rounds === "number" ? 1 : 0;
  const notesByWeek = {
    1: block.notes ?? "Stay smooth and deliberate.",
    2: `${block.notes ?? "Stay smooth and deliberate."} Add one round if quality stays high.`,
    3: `${block.notes ?? "Stay smooth and deliberate."} Trim rest slightly and move explosively.`,
    4: `${block.notes ?? "Stay smooth and deliberate."} Use random direction cues or combine movement with a shadow swing.`
  };

  return {
    ...block,
    rounds: typeof block.rounds === "number" ? block.rounds + extraRound : block.rounds,
    notes: notesByWeek[weekNumber as 1 | 2 | 3 | 4]
  };
};

const tuneDay = (day: WorkoutDay, weekNumber: number, extraMinutes = 0): WorkoutDay => ({
  ...day,
  notes: progressionThemes[weekNumber as 1 | 2 | 3 | 4].focus,
  estimatedMinutes: day.estimatedMinutes + extraMinutes,
  blocks: day.blocks.map((block) => cloneBlock(block, weekNumber))
});

const fullPlanBaseDays: WorkoutDay[] = [
  {
    id: "full-day-1",
    dayNumber: 1,
    title: "Day 1: Power + Footwork + Groundstroke Mechanics",
    focus: "Lower-body power, rotational speed, and forehand/backhand organization.",
    warmupIds,
    blocks: [
      {
        id: "full-day-1-power",
        title: "Lower-body power",
        focus: "Explode, land, and reload cleanly.",
        rounds: 3,
        notes: "Rest 45 to 60 seconds between sets.",
        exerciseIds: ["squat-jump", "lateral-bound-stick", "kettlebell-swing"]
      },
      {
        id: "full-day-1-rotation",
        title: "Rotational power",
        focus: "Connect hips, trunk, and paddle side.",
        rounds: 3,
        exerciseIds: ["band-rotational-chop", "half-kneeling-band-press-rotation", "shadow-forehand-hip-turn"]
      },
      {
        id: "full-day-1-footwork",
        title: "Footwork",
        focus: "Build split-step timing and recovery patterns.",
        rounds: 4,
        exerciseIds: ["split-step-to-shuffle", "forward-backward-movement", "crossover-recovery-step"]
      }
    ],
    techniqueIds: [
      "forehand-shadow-reps",
      "backhand-shadow-reps",
      "wall-forehand",
      "wall-backhand",
      "wall-alternate-groundstrokes"
    ],
    recoveryIds: ["calf-stretch", "wrist-mobility"],
    estimatedMinutes: 42
  },
  {
    id: "full-day-2",
    dayNumber: 2,
    title: "Day 2: Agility + Balance + Dinks + Volleys",
    focus: "Quick feet, single-leg control, and short-game skill.",
    warmupIds,
    blocks: [
      {
        id: "full-day-2-agility",
        title: "Agility",
        focus: "Fast contacts and lateral rhythm.",
        rounds: 4,
        exerciseIds: ["line-hops-front-back", "line-hops-side-side", "skater-steps"]
      },
      {
        id: "full-day-2-stability",
        title: "Single-leg stability",
        focus: "Own the outside edge and reaching posture.",
        rounds: 3,
        exerciseIds: ["single-leg-rdl", "step-back-lunge-knee-drive", "single-leg-lateral-reach"]
      },
      {
        id: "full-day-2-volley",
        title: "Volley + hand-speed block",
        focus: "Compact contacts with quick recovery.",
        rounds: 3,
        exerciseIds: [
          "wall-volley-taps",
          "forehand-volley-punch-shadow",
          "backhand-volley-punch-shadow",
          "ready-position-resets"
        ]
      },
      {
        id: "full-day-2-dink",
        title: "Dink control block",
        focus: "Touch, low posture, and balance into recovery.",
        rounds: 1,
        exerciseIds: [
          "soft-forehand-dinks-wall",
          "soft-backhand-dinks-wall",
          "alternating-dinks-wall",
          "step-in-dink-recover",
          "shadow-dink-pattern"
        ]
      }
    ],
    techniqueIds: ["shadow-dink-pattern", "wall-volley-taps"],
    recoveryIds: ["hip-flexor-stretch", "hamstring-stretch"],
    estimatedMinutes: 40
  },
  {
    id: "full-day-3",
    dayNumber: 3,
    title: "Day 3: Recovery + Mobility + Technical Patterning",
    focus: "Restore range while keeping shot patterns fresh.",
    warmupIds: [],
    blocks: [
      {
        id: "full-day-3-mobility",
        title: "Mobility flow",
        focus: "Regain tissue quality and usable range.",
        rounds: 1,
        exerciseIds: [
          "calf-stretch",
          "hip-flexor-stretch",
          "ninety-ninety-switches",
          "thoracic-rotation",
          "hamstring-stretch",
          "adductor-rock-backs",
          "shoulder-external-rotation-band",
          "wrist-mobility"
        ]
      },
      {
        id: "full-day-3-technique",
        title: "Shadow technique",
        focus: "Maintain crisp movement patterns without fatigue.",
        rounds: 1,
        exerciseIds: [
          "forehand-shadow-reps",
          "backhand-shadow-reps",
          "shadow-volley-punch",
          "shadow-dink-pattern",
          "overhead-prep-shadow",
          "wide-reach-recover-shadow"
        ]
      }
    ],
    techniqueIds: ["forehand-shadow-reps", "backhand-shadow-reps", "wide-reach-recover-shadow"],
    recoveryIds: ["light-mobility-reset"],
    estimatedMinutes: 28
  },
  {
    id: "full-day-4",
    dayNumber: 4,
    title: "Day 4: Speed + Reaching + Rotational Strength",
    focus: "First-step speed, reaching mechanics, and drive/counter power.",
    warmupIds,
    blocks: [
      {
        id: "full-day-4-quickness",
        title: "Quickness",
        focus: "Explosive first push and short-range acceleration.",
        rounds: 5,
        exerciseIds: ["split-step-sprint", "shuffle-shuffle-touch"]
      },
      {
        id: "full-day-4-reach",
        title: "Reaching and recovery",
        focus: "Load wide and recover back to center.",
        rounds: 3,
        exerciseIds: ["lateral-lunge", "lunge-reach-paddle", "wide-plant-push-center"]
      },
      {
        id: "full-day-4-rotation",
        title: "Rotational strength",
        focus: "Support faster drives and more stable counters.",
        rounds: 3,
        exerciseIds: ["band-woodchop", "band-lift", "pallof-press-hold"]
      }
    ],
    techniqueIds: [
      "shadow-forehand-drive",
      "shadow-backhand-drive",
      "counter-block-forehand",
      "counter-block-backhand"
    ],
    recoveryIds: ["calf-stretch", "thoracic-rotation"],
    estimatedMinutes: 38
  },
  {
    id: "full-day-5",
    dayNumber: 5,
    title: "Day 5: Pickleball Conditioning Circuit",
    focus: "Whole-body conditioning with pickleball posture and foot rhythm.",
    warmupIds,
    blocks: [
      {
        id: "full-day-5-circuit",
        title: "Conditioning circuit",
        focus: "Move continuously while staying athletic.",
        rounds: 4,
        notes: "Rest 60 seconds between rounds. Week 4 can reach 5 rounds if quality stays good.",
        exerciseIds: [
          "squat-to-press",
          "push-ups",
          "kettlebell-swing",
          "shadow-side-shuffles",
          "split-step-bounce",
          "burpee-athletic-stance",
          "fast-step-backs"
        ]
      }
    ],
    techniqueIds: ["ready-position-resets"],
    recoveryIds: ["hip-flexor-stretch", "wrist-mobility"],
    estimatedMinutes: 34
  },
  {
    id: "full-day-6",
    dayNumber: 6,
    title: "Day 6: Play or Drill",
    focus: "Transfer training to match play or a focused wall/shadow session.",
    warmupIds: ["march-jog-place", "split-step-bounce", "shadow-forehand-swing", "shadow-backhand-swing"],
    blocks: [
      {
        id: "full-day-6-transfer",
        title: "Transfer day",
        focus: "Pick live play, wall reps, or targeted home practice.",
        rounds: 1,
        notes: "Log one tactical note and one technical note afterward.",
        exerciseIds: ["play-session", "wall-volley-taps", "alternating-dinks-wall"]
      }
    ],
    techniqueIds: ["wide-reach-recover-shadow", "shadow-dink-pattern"],
    recoveryIds: ["light-mobility-reset"],
    estimatedMinutes: 30
  },
  {
    id: "full-day-7",
    dayNumber: 7,
    title: "Day 7: Rest or Light Mobility",
    focus: "Recover, review, and keep joints moving without fatigue.",
    warmupIds: [],
    blocks: [
      {
        id: "full-day-7-recovery",
        title: "Recovery reset",
        focus: "Unload the week and stay ready for the next cycle.",
        rounds: 1,
        exerciseIds: [
          "light-mobility-reset",
          "hip-flexor-stretch",
          "thoracic-rotation",
          "calf-stretch",
          "wrist-mobility"
        ]
      }
    ],
    techniqueIds: [],
    recoveryIds: ["light-mobility-reset"],
    estimatedMinutes: 18
  }
];

const condensedPlanBaseDays: WorkoutDay[] = [
  {
    id: "condensed-day-1",
    dayNumber: 1,
    title: "Day 1: Power + Footwork + Forehand",
    focus: "Fast lower body and clean forehand organization in a short session.",
    warmupIds: ["march-jog-place", "simulated-jump-rope", "hip-circles", "split-step-bounce", "shadow-forehand-swing"],
    blocks: [
      {
        id: "condensed-day-1-power",
        title: "Power",
        focus: "Short, crisp lower-body power work.",
        rounds: 3,
        exerciseIds: ["squat-jump", "lateral-bound-stick"]
      },
      {
        id: "condensed-day-1-footwork",
        title: "Footwork",
        focus: "Split-step and lateral recovery.",
        rounds: 3,
        exerciseIds: ["split-step-to-shuffle", "crossover-recovery-step"]
      },
      {
        id: "condensed-day-1-strength",
        title: "Strength/stability",
        focus: "Support power with balance and trunk control.",
        rounds: 2,
        exerciseIds: ["single-leg-rdl", "pallof-press-hold"]
      }
    ],
    techniqueIds: ["forehand-shadow-reps", "wall-forehand"],
    recoveryIds: ["calf-stretch"],
    estimatedMinutes: 25
  },
  {
    id: "condensed-day-2",
    dayNumber: 3,
    title: "Day 2: Agility + Dinks + Volleys",
    focus: "Fast feet with compact kitchen skill practice.",
    warmupIds: ["march-jog-place", "simulated-jump-rope", "arm-circles", "split-step-bounce", "shadow-volley-punch"],
    blocks: [
      {
        id: "condensed-day-2-agility",
        title: "Agility",
        focus: "Quick contacts and side-to-side rhythm.",
        rounds: 3,
        exerciseIds: ["line-hops-side-side", "skater-steps", "shuffle-shuffle-touch"]
      },
      {
        id: "condensed-day-2-stability",
        title: "Strength/stability",
        focus: "Single-leg control for wide recoveries.",
        rounds: 2,
        exerciseIds: ["step-back-lunge-knee-drive", "single-leg-lateral-reach"]
      }
    ],
    techniqueIds: ["wall-volley-taps", "shadow-dink-pattern", "step-in-dink-recover"],
    recoveryIds: ["hip-flexor-stretch"],
    estimatedMinutes: 24
  },
  {
    id: "condensed-day-3",
    dayNumber: 5,
    title: "Day 3: Speed + Rotation + Backhand",
    focus: "Explosive starts, rotational strength, and compact backhand skill.",
    warmupIds: ["march-jog-place", "hip-circles", "worlds-greatest-stretch", "split-step-bounce", "shadow-backhand-swing"],
    blocks: [
      {
        id: "condensed-day-3-speed",
        title: "Speed",
        focus: "First-step acceleration.",
        rounds: 4,
        exerciseIds: ["split-step-sprint", "forward-backward-movement"]
      },
      {
        id: "condensed-day-3-power",
        title: "Power + rotation",
        focus: "Ground-up rotational support.",
        rounds: 3,
        exerciseIds: ["kettlebell-swing", "band-woodchop", "band-lift"]
      }
    ],
    techniqueIds: ["backhand-shadow-reps", "shadow-backhand-drive", "counter-block-backhand"],
    recoveryIds: ["thoracic-rotation", "wrist-mobility"],
    estimatedMinutes: 26
  }
];

const hybridPlanBaseDays: WorkoutDay[] = [
  fullPlanBaseDays[0],
  fullPlanBaseDays[1],
  fullPlanBaseDays[3],
  fullPlanBaseDays[5]
].map((day, index) => ({
  ...day,
  id: `hybrid-day-${index + 1}`,
  dayNumber: [1, 2, 4, 6][index]
}));

const buildPlan = (
  format: WeeklyPlan["format"],
  weekNumber: 1 | 2 | 3 | 4,
  baseDays: WorkoutDay[],
  name: string,
  extraMinutes: number
): WeeklyPlan => ({
  id: `${format}-week-${weekNumber}`,
  name,
  format,
  weekNumber,
  progressionTheme: progressionThemes[weekNumber].theme,
  weeklyFocus: progressionThemes[weekNumber].focus,
  days: baseDays.map((day) => tuneDay(day, weekNumber, extraMinutes))
});

export const weeklyPlans: WeeklyPlan[] = [
  buildPlan("full-5day", 1, fullPlanBaseDays, "Full Pickleball Performance Plan", 0),
  buildPlan("full-5day", 2, fullPlanBaseDays, "Full Pickleball Performance Plan", 4),
  buildPlan("full-5day", 3, fullPlanBaseDays, "Full Pickleball Performance Plan", 6),
  buildPlan("full-5day", 4, fullPlanBaseDays, "Full Pickleball Performance Plan", 8),
  buildPlan("condensed-3day", 1, condensedPlanBaseDays, "Condensed 3-Day Home Plan", 0),
  buildPlan("condensed-3day", 2, condensedPlanBaseDays, "Condensed 3-Day Home Plan", 3),
  buildPlan("condensed-3day", 3, condensedPlanBaseDays, "Condensed 3-Day Home Plan", 4),
  buildPlan("condensed-3day", 4, condensedPlanBaseDays, "Condensed 3-Day Home Plan", 5),
  buildPlan("hybrid", 1, hybridPlanBaseDays, "Hybrid Home + Play Plan", 0),
  buildPlan("hybrid", 2, hybridPlanBaseDays, "Hybrid Home + Play Plan", 3),
  buildPlan("hybrid", 3, hybridPlanBaseDays, "Hybrid Home + Play Plan", 4),
  buildPlan("hybrid", 4, hybridPlanBaseDays, "Hybrid Home + Play Plan", 5)
];

export const workoutDayIds = Array.from(new Set(weeklyPlans.flatMap((plan) => plan.days.map((day) => day.id))));

export const skillIds = techniqueSkills.map((skill) => skill.id);

export const recommendPlan = (input: {
  availableTrainingDays: number;
  playDaysPerWeek: number;
  goals: string[];
}): AssessmentResult => {
  if (input.availableTrainingDays <= 3) {
    return {
      recommendedPlan: "condensed-3-day",
      rationale: "Three or fewer training days works best with a condensed plan that still touches power, footwork, stability, and technique every week."
    };
  }

  if (input.availableTrainingDays >= 5 && input.goals.some((goal) => ["power", "conditioning", "speed"].includes(goal))) {
    return {
      recommendedPlan: "full-5-day",
      rationale: "You have enough available sessions to run the full structure and build power, movement quality, and conditioning without crowding the week."
    };
  }

  if (input.playDaysPerWeek >= 3) {
    return {
      recommendedPlan: "hybrid",
      rationale: "A hybrid plan leaves more room for live play while still covering the movement, rotation, and technique pieces that tend to move the needle at home."
    };
  }

  return {
    recommendedPlan: "full-5-day",
    rationale: "Your schedule can support the full progression, and it gives the clearest split between power, agility, recovery, speed, and conditioning."
  };
};
