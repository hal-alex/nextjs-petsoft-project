import style from "./page.module.css"
import PetList from "@/components/PetList"
import SearchForm from "@/components/SearchForm"
import PetDetails from "@/components/PetDetails"
import ContentBlock from "@/components/ContentBlock"
import Stats from "@/components/Stats"
import DialogButton from "@/components/DialogButton"
import AddingPetPopup from "@/components/AddingPetPopup"
import PetSearch from "@/components/PetSearch"

const Dashboard = () => {
  return (
    <main>
      <div className={style.seconSection}>
        <section>
          <h1 className={style.h1}>Pet Soft</h1>
          <p>Manage your pet daycare with ease</p>
        </section>
        <section className={style.stats}>
          <Stats />
        </section>
      </div>
      <div className={style.containerDetails}>
        <div className={style.gridItem}>
          <SearchForm />
        </div>
        <div className={style.gridItemSecond}>
          <ContentBlock>
            <PetList />
            <div className={style.buttonContainer}>
              <DialogButton content={<AddingPetPopup actionType={"add"} />}>
                Add pet
              </DialogButton>
            </div>
          </ContentBlock>
        </div>

        <div className={style.gridItemThird}>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
      <div>
        <PetSearch />
      </div>
    </main>
  )
}
export default Dashboard
