/* TODO: move to middleware file when possible
and update eslintrc.json */

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const ibmPlexSansMediumUrl = new URL(
  "assets/fonts/IBMPlexSans-Medium.ttf",
  import.meta.url
);

const ibmPlexSansSemiboldUrl = new URL(
  "assets/fonts/IBMPlexSans-SemiBold.ttf",
  import.meta.url
);

const ibmPlexSansMedium = fetch(`${ibmPlexSansMediumUrl}`).then(async (res) =>
  res.arrayBuffer()
);
const ibmPlexSansSemibold = fetch(`${ibmPlexSansSemiboldUrl}`).then(
  async (res) => res.arrayBuffer()
);

export default async function handler(req: NextRequest) {
  const ibmPlexSansMediumData = await ibmPlexSansMedium;
  const ibmPlexSansSemiboldData = await ibmPlexSansSemibold;

  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Code snippets";
    const hasCategory = searchParams.has("category");
    const category = hasCategory
      ? searchParams.get("category")?.slice(0, 100)
      : null;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F5F7FB",
            fontSize: 48,
            fontWeight: 500,
            fontFamily: "IBM Plex Sans",
            padding: "0 7.5%",
            color: "#5E5252",
          }}
        >
          <div style={{ display: "flex", flex: 1, paddingTop: "12.5%" }}>
            {title}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: category ? "space-between" : "flex-end",
              alignItems: "center",
              fontWeight: 600,
              paddingBottom: "10%",
            }}
          >
            {category && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1,
                  padding: "0.5em 1em",
                  color: "#5746AF",
                  backgroundColor: "#EDE9FE",
                  borderRadius: "4px",
                }}
              >
                {category}
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                width="31"
                height="31"
                fill="none"
                viewBox="0 0 31 31"
                style={{ width: 40, height: 40 }}
              >
                <circle
                  cx="15.667"
                  cy="15.906"
                  r="10.667"
                  fill="#ED5497"
                ></circle>
                <path
                  fill="#fff"
                  d="M17.496 13.788a1.338 1.338 0 00-.622-1.006c-.363-.238-.81-.358-1.338-.358-.386 0-.724.063-1.014.188a1.62 1.62 0 00-.673.515c-.16.22-.24.468-.24.746 0 .233.056.433.167.601.114.165.259.303.435.413.176.108.36.198.554.269.193.068.37.123.532.166l.887.239c.227.06.48.142.758.247.282.105.55.248.806.43.258.18.471.41.639.69.168.282.251.627.251 1.036 0 .472-.123.898-.37 1.279-.245.38-.603.683-1.074.907-.469.225-1.039.337-1.71.337-.624 0-1.165-.101-1.623-.303a2.587 2.587 0 01-1.074-.844 2.408 2.408 0 01-.438-1.257h1.09c.029.33.14.603.333.819a1.8 1.8 0 00.741.477c.302.102.625.153.972.153a2.86 2.86 0 001.087-.196c.32-.133.575-.318.762-.554.188-.238.282-.517.282-.835 0-.29-.081-.526-.243-.707a1.783 1.783 0 00-.64-.444 6.734 6.734 0 00-.856-.298l-1.074-.307c-.682-.196-1.222-.475-1.62-.84-.397-.363-.596-.839-.596-1.427 0-.488.132-.915.396-1.278.268-.367.625-.65 1.074-.852a3.627 3.627 0 011.513-.307c.563 0 1.063.1 1.5.302.438.2.784.472 1.04.819.259.346.395.74.409 1.18h-1.023z"
                ></path>
                <g filter="url(#filter0_d_428_190)">
                  <path
                    fill="#5E5252"
                    d="M19.792 16.91l10.84 7.177-5.277 1.074-2.975 4.488-2.588-12.74z"
                  ></path>
                  <path
                    stroke="#fff"
                    strokeWidth="0.333"
                    d="M22.463 29.222l-2.427-11.951 10.168 6.733-4.882.994-.068.013-.038.058-2.753 4.153z"
                  ></path>
                </g>
                <defs>
                  <filter
                    id="filter0_d_428_190"
                    width="11.868"
                    height="13.769"
                    x="19.02"
                    y="16.652"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    ></feColorMatrix>
                    <feOffset dx="-0.257" dy="0.257"></feOffset>
                    <feGaussianBlur stdDeviation="0.257"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_428_190"
                    ></feBlend>
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_428_190"
                      result="shape"
                    ></feBlend>
                  </filter>
                </defs>
              </svg>
              <div style={{ display: "flex", marginLeft: 4, marginTop: -4 }}>
                Serena Antonetti
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "IBM Plex Sans",
            data: ibmPlexSansMediumData,
            style: "normal",
            weight: 500,
          },
          {
            name: "IBM Plex Sans",
            data: ibmPlexSansSemiboldData,
            style: "normal",
            weight: 600,
          },
        ],
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
