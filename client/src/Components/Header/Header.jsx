import React from "react";
import style from "./header.module.scss";

export function Header() {
  return (
    <div className={style.container}>
      <a href="https://api.whatsapp.com/">
        <img
          className={style.img}
          src="https://static.whatsapp.net/rsrc.php/v3/yO/r/FsWUqRoOsPu.png"
          alt="Sorry, we don't found anything here!"
        />
      </a>
      <img
        className={style.img3}
        src={
          "https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png"
        }
        alt="Oops! We don't found anything here. Try again tomorrow!"
      />
      <a href="https://www.facebook.com/photo?fbid=10210805021320727&set=a.2339328021758">
        <img
          className={style.img2}
          src="https://marketing4ecommerce.net/wp-content/uploads/2020/02/historia-de-facebook.jpg"
          alt= "Sorry, nothing to show you"
        />
      </a>
    </div>
  );
}
