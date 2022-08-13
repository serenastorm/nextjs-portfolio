import { CSSProperties, useEffect, useState } from "react";

import styles from "./DiaryMouseEffect.module.scss";

let colours = new Array(
  "#ff0000",
  "#00ff00",
  "#ffffff",
  "#ff00ff",
  "#ffa500",
  "#ffff00",
  "#00ff00",
  "#ffffff",
  "ff00ff"
);

let swide = 800;
let shigh = 600;

type MousePosition = {
  left: number;
  top: number;
};

const DiaryMouseEffect = () => {
  const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({
    left: 0,
    top: 0,
  });

  let scrollPositions = {
    left: [mousePosition.left, prevMousePosition.left],
    top: [mousePosition.top, prevMousePosition.top],
  };

  let scrollDifference = {
    left: scrollPositions.left[1] - scrollPositions.left[0],
    top: scrollPositions.top[1] - scrollPositions.top[0],
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        left: event.clientX || 0,
        top: event.clientY || 0,
      });

      setTimeout(() => {
        setPrevMousePosition({
          left: event.clientX || 0,
          top: event.clientY || 0,
        });
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  let dots = [];

  for (var i = 0; i < 20; i++) {
    let opacity = 1;
    const randomIntFromInterval = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    let positionLeft = randomIntFromInterval(
      scrollPositions.left[0],
      scrollPositions.left[1]
    );
    let positionTop = randomIntFromInterval(
      scrollPositions.top[0],
      scrollPositions.top[1]
    );

    // setTimeout(() => {
    //   positionLeft = mousePosition.left + i;
    //   positionTop = mousePosition.top;
    //   opacity = 0;
    // }, 500);

    const scale = randomIntFromInterval(4, 99);

    dots.push(
      <>
        <div
          id={`dots${i}`}
          className={styles.dot}
          style={
            {
              "--dot-scale": `1.${scale}`,
            } as CSSProperties
          }
        >
          <div></div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <table>
        <thead>
          <th></th>
          <th>left</th>
          <th>top</th>
        </thead>
        <tbody>
          <tr>
            <td>mousePosition</td>
            <td>{mousePosition.left}</td>
            <td>{mousePosition.top}</td>
          </tr>
          <tr>
            <td>prevMousePosition</td>
            <td>{prevMousePosition.left}</td>
            <td>{prevMousePosition.top}</td>
          </tr>
          <tr>
            <td>scrollDifference</td>
            <td>{scrollDifference.left}</td>
            <td>{scrollDifference.top}</td>
          </tr>
        </tbody>
      </table> */}
      <div
        style={
          {
            "--mouse-position-top": mousePosition.top,
            "--mouse-position-left": mousePosition.left,
            "--prev-mouse-position-top": prevMousePosition.top,
            "--prev-mouse-position-left": prevMousePosition.left,
            "--scroll-difference-top": scrollDifference.top,
            "--scroll-difference-left": scrollDifference.left,
          } as CSSProperties
        }
      >
        {/* {dots} */}
      </div>
    </>
  );
};

export default DiaryMouseEffect;
