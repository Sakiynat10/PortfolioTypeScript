import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../layout/footer";
import Header from "../layout-portfolio/header";

const PortfolioLayout = () => {
  return (
    <Fragment>
        <Header/>
        <main>
           <Outlet/>
        </main>
        <Footer/>
    </Fragment>
  )
}

export default PortfolioLayout