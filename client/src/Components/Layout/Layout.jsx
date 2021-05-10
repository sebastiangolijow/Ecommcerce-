import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";
import { MyChatbot } from "../ChatBot/ChatBot";
import styles from "./layout.module.scss";
import AppBar from "../Nav/AppBar";

import { ThemeProvider } from "@material-ui/styles";
import theme from "../../theme";
import darkTheme from "../../themeDark";




function Layout({ children, priority, dark }) {

  const [themeChoosen, setIsDark] = useState(theme)

  useEffect(() => {
    if(dark) {
      setIsDark(darkTheme)
    } else {
      setIsDark(theme)
    }
  }, [dark])

  return (
    <ThemeProvider theme={themeChoosen}>
    <div className={dark ? styles.containerDark : styles.container}>
      <Whatsapp />
      <MyChatbot />
      <main>
        <AppBar priority={priority} dark={dark} />
        {children}
        <Footer priority={priority} dark={dark} />
      </main>
    </div>
    </ThemeProvider>
  );
}

export default Layout;
