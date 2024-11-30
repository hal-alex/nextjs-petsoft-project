"use client"
import Image from "next/image"
import styles from "../page.module.css"
import { useState } from "react"
import clsx from "clsx"
import marketingStyle from "./page.module.css"
import Link from "next/link"

export default function Home() {
  const [isRed, setIsRed] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const returnArray = <T extends string | any[]>(arr: T): T[] => {
    if (typeof arr === "string") {
      return [arr]
    } else {
      return [...arr]
    }
  }

  console.log("rendered")
  return (
    <main className={clsx(styles.homepageBody)}>
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="homepage screenshot"
        width={519}
        height={472}
      />
      <div>
        <h1 className={clsx(marketingStyle.header)}>
          Manage your{" "}
          <span className={clsx(marketingStyle.span)}>pet daycare</span>{" "}
          software
        </h1>
        <p className={styles.heroText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className={styles.buttonContainer}>
          <button>
            <Link href="/signup">Sign up</Link>
          </button>
          <button>
            <Link href="/login">Log in</Link>
          </button>
        </div>
      </div>
    </main>
  )
}
