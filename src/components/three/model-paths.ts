export type CharacterPose = "idle" | "walk" | "stomp";

export const MODEL_PATHS: Record<CharacterPose, string> = {
  idle: "/models/Afro_Geek_0516044824_texture.glb",
  walk: "/models/Meshy_AI_Animation_Walking_withSkin.glb",
  stomp: "/models/Meshy_AI_Animation_Angry_Ground_Stomp_2_withSkin.glb",
};

export const POSE_LABELS: Record<CharacterPose, string> = {
  idle: "Idle",
  walk: "Walk",
  stomp: "Stomp",
};
