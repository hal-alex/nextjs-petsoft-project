import style from "./page.module.css"
import PetList from "@/components/PetList"
import SearchForm from "@/components/SearchForm"
import PetDetails from "@/components/PetDetails"
import ContentBlock from "@/components/ContentBlock"

const Dashboard = async () => {
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
      <div className={style.containerDetails}>
        <div className={style.gridItem}>
          <SearchForm />
        </div>
        <div className={style.gridItemSecond}>
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className={style.gridItemThird}>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  )
}
export default Dashboard
