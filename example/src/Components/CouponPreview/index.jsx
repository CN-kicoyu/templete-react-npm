import React from 'react'
import './index.scss'

function CouponPreview ({name, price, priceDesc, nameDesc}) {
  return (
    <div className="coupon-wrap">
      <div className="coupon-content">
        <div className="coupon-left">
          <p className="coupon-price"><span>¥</span> {price}</p>
          <p className="coupon-desc">{priceDesc}</p>
        </div>
        <p className="coupon-divish"></p>
        <div className="coupon-right">
          <p className="coupon-good">{name}</p>
          <p className="coupon-desc">{nameDesc}</p>
        </div>
      </div>
    </div>
  )
}

export default CouponPreview
