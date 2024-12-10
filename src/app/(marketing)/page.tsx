"use client"
import Image from "next/image"
import styles from "../page.module.css"
import clsx from "clsx"
import marketingStyle from "./page.module.css"
import Link from "next/link"

export default function Home() {
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
          industry.
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
