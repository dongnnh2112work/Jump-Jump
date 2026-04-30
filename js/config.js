export const CFG = {
  POWER: {
    MIN: 15,
    MAX: 100,
  },
  WORLD: {
    GRAVITY: 32,
    JUMP_VY_FACTOR: 0.18,
    JUMP_VY_BASE: 4,
    FLOOR_DEATH_OFFSET: 100,
  },
  CAMERA: {
    FOLLOW_LERP: 0.1,
    BASE_OFFSET_X: 0,
    BASE_OFFSET_Y: 110,
  },
  ISO: {
    TILE_WIDTH: 120,
    TILE_DEPTH: 60,
    TILE_HEIGHT: 20,
    PLATFORM_STACK_MIN: 2,
    PLATFORM_STACK_MAX: 3,
  },
  DEBUG: {
    SHOW_PANEL: false,
  },
};

export const PLATFORM_TYPES = {
  grass: {
    top: "#7EC850",
    left: "#5A9E30",
    right: "#4A8220",
  },
  stone: {
    top: "#9E9E9E",
    left: "#757575",
    right: "#616161",
  },
  red: {
    top: "#EF5350",
    left: "#C62828",
    right: "#B71C1C",
  },
  dark: {
    top: "#424242",
    left: "#212121",
    right: "#1A1A1A",
  },
};
