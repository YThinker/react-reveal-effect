import { GlobalEffectConfigType } from "../types";

export const globalConfig: GlobalEffectConfigType<"background-image" | "border-image"> = {
  elementEffect: true,
  borderEffect: true,
  clickEffect: false,
  borderColor: "rgba(255, 255, 255, 0.6)",
  elementColor: "rgba(255, 255, 255, 0.3)",
  clickColor: "rgba(255, 255, 255, 0.3)",
  borderGradientSize: 150,
  elementGradientSize: 150,
  clickGradientSize: 80,
  stop: false,
  effectType: "background-image"
}