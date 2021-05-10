import React, { useEffect, useRef, useState } from 'react'
import styles from './Points.module.scss'

export function Points() {


    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <h1 className={styles.tag}>TechStore Points</h1>
                <div className={styles.border}>
                    <section className={styles.section}>
                        <h2 className={styles.text}>
                            ¿Como obtener TechPoints?
                        </h2>
                        <h2 className={styles.text}>
                            Por cada dolar gastado en la tienda se te otorgara 1 punto de descuento.
                        </h2>
                    </section>
                </div>
                <div className={styles.border}>
                    <section className={styles.section}>
                        <h2 className={styles.text}>
                            Si recomiendas a un amigo la pagina y este realiza una compra, se te otorgara a ti <strong>Tambien</strong> el 20% de los
                        puntos que este obtendra.
                        </h2>
                    </section>
                </div>
            </div>
        </div>
    )
}