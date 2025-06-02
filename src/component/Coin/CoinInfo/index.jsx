import React, { useState } from 'react'
import "./styles.css"
import { motion as Motion } from 'framer-motion';

function CoinInfo({ heading, desc }) {
    const shortDesc = desc.slice(0, 350) + "<p style='color:var(--gray);cursor:pointer'> Read More...</p>";
    const longDesc = desc + "<p style='color:var(--gray);cursor:pointer'> Read Less...</p>";
    const [flag, setFlag] = useState(false)

    return (
        <Motion.div className='gray-wrapper'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className='info-heading'>{heading}</h2>
            {
                desc.length > 350 ?
                    (
                        <p className='info-desc'
                            onClick={() => setFlag(!flag)}
                            dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }} />
                    )
                    :
                    (
                        <p className='info-desc' dangerouslySetInnerHTML={{ __html: desc }} />
                    )
            }
        </Motion.div>
    )
}

export default CoinInfo
