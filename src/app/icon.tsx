import { ImageResponse } from "next/og";

/**
 * Favicon tipográfico provisório: "B" sobre grafite, conforme fallback
 * documentado em visual-direction.md para quando public/brand/barb-logo.svg
 * ainda não existe. Trocar por um favicon gerado do logotipo real quando
 * a cliente enviar (ver README.md).
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#19191A",
          color: "#F3F2EC",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        B
      </div>
    ),
    { ...size }
  );
}
