import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import timeout from "./utils/util";
import styles from "./SimonSays.module.scss";
import swal from "sweetalert";
import { addPoints } from "../../Redux/Users/usersActions";

const SimonSays = () => {
  const [start, setStart] = useState(false);
  const [lightColor, setLightColor] = useState("");
  const user = useSelector((state) => state.usersReducer.userLoged);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.darkReducer.dark);
  const colorList = ["blue", "purple", "orange", "green"];

  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initPlay);

  const startGame = () => {
    setStart(true);
  };

  useEffect(() => {
    if (start) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
    // eslint-disable-next-line
  }, [start]);

  useEffect(() => {
    if (start && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];

      const colorsCopy = [...play.colors];
      colorsCopy.push(newColor);
      setPlay({ ...play, colors: colorsCopy });
    }
    // eslint-disable-next-line
  }, [start, play.isDisplay]);

  useEffect(() => {
    if (start && play.isDisplay && play.colors.length) {
      displayColors();
    }
    // eslint-disable-next-line
  }, [start, play.isDisplay, play.colors.length]);

  useEffect(() => {
    if (start && !play.isDisplay && !play.userPlay && play.score) {
      swal("Congrats!", `You earned ${play.score * 10} points`, "success").then(
        () => {
          return dispatch(addPoints(user.id, play.score * 10));
        }
      );
    }
    // eslint-disable-next-line
  }, [start, play.isDisplay, play.userPlay, play.score]);

  const displayColors = async () => {
    await timeout(1000);
    for (let i = 0; i < play.colors.length; i++) {
      setLightColor(play.colors[i]);
      await timeout(500);
      setLightColor("");
      await timeout(500);

      if (i === play.colors.length - 1) {
        const colorsCopy = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: colorsCopy.reverse(),
        });
      }
    }
  };

  const handleClick = async (color) => {
    if (!play.isDisplay && play.userPlay) {
      const userColorsCopy = [...play.userColors];
      const lastColor = userColorsCopy.pop();
      setLightColor(color);

      if (color === lastColor) {
        if (userColorsCopy.length) {
          setPlay({ ...play, userColors: userColorsCopy });
        } else {
          await timeout(500);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(500);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(500);
      setLightColor("");
    }
  };

  const endGame = () => {
    setStart(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameboard}>
        <div
          onClick={(e) => handleClick(e.target.id)}
          className={
            lightColor === "blue" ? styles.celeste_light : styles.celeste
          }
          id="blue"
        ></div>
        <div
          onClick={(e) => handleClick(e.target.id)}
          className={
            lightColor === "purple" ? styles.violeta_light : styles.violeta
          }
          id="purple"
        ></div>
        <div
          onClick={(e) => handleClick(e.target.id)}
          className={
            lightColor === "orange" ? styles.naranja_light : styles.naranja
          }
          id="orange"
        ></div>
        <div
          onClick={(e) => handleClick(e.target.id)}
          className={lightColor === "green" ? styles.verde_light : styles.verde}
          id="green"
        ></div>
        {start && !play.isDisplay && !play.userPlay && play.score && (
          <div className="lost">
            <button onClick={endGame} className={dark ? styles.btnD_start : styles.btn_start}>
              Close
            </button>
          </div>
        )}
        {!start && !play.score && (
          <button onClick={startGame} className={dark ? styles.btnD_start : styles.btn_start}>
            Start!
          </button>
        )}
        {start && (play.isDisplay || play.userPlay) && (
          <button className={ dark ? styles.scoreD : styles.score} disabled>
            {play.score}
          </button>
        )}
      </div>
    </div>
  );
};

export default SimonSays;
