import React from "react";
import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/phone.png";
import gradient from "../../../assets/gradient.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MainComponent() {
    return (
        <div className="flex-info">
            <div className="left-component">
                <motion.h1
                    className="track-crypto-heading"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Track Crypto
                </motion.h1>
                <motion.h1
                    className="real-time-heading"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Real Time.{" "}
                </motion.h1>
                <motion.p className="info-text"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Track crypto through a public api in real time. Visit the dashboard to
                    do so!
                </motion.p>
                <motion.div className="btn-flex"
                    initial={{ opacity: 0, scale: 0.5, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}>
                    <Link to="/dashboard" className="navigate"> 
                    <Button text={"Dashboard"} />
                    </Link>
                    <Button text={"Share"} outline={true} />
                </motion.div>
            </div>

            <div className="phone-container">
                <motion.img
                    src={iphone}
                    className="iphone"
                    initial={{ y: -20 }}
                    animate={{ y: 20 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror",  ease: "linear"  }}
                    alt="iphone"
                />
                <img src={gradient} className="gradient" />
            </div>
        </div>
    );
}

export default MainComponent;
