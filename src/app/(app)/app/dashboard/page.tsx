import style from "./page.module.css"

const Dashboard = () => {
  return (
    <main>
      <div className={style.seconSection}>
        <section>
          <h1 className={style.h1}>Pet Soft</h1>
          <p>Manage your pet daycare with ease</p>
        </section>
        <section className={style.stats}>
          <p>2</p>
          <p>current guests</p>
        </section>
      </div>
    </main>
  )
}
export default Dashboard
