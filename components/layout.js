import React from "react"
import Image from "next/image"

export default function Layout({ children }) {
  return (
    <div>
        Hello world
    <div className={"image-container"}>
        <Image
          className="image"
          src="/images/kau-logo.png"
          alt="Autorickshaw Driver's Union (R) CITU"
          fill
        />

        </div>
      <main>{children}</main>

    </div>
  )
}