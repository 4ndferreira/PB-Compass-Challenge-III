//React
import { ChangeEvent, useState } from "react";
//React Router Dom
import { useNavigate } from "react-router-dom";
//Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Config";
//Hook
import { useFetch } from "../../hooks/useFetch";
import { useMediaQuery } from "../../hooks/useMediaQuery";
// Components
import HeaderMobileForHome from "../../components/headerMobileForHome/HeaderMobileForHome";
import Categories from "../../components/listOfSelectorLabels/ListOfSelectorLabels";
import Input from "../../components/input/Input";
import Showcase from "../../components/showcase/Showcase";
import Carousel from "../../components/carousel/Carousel";
import BannerSkeleton from "../../components/bannerSkeleton/BannerSkeleton";
import SearchIcon from "../../components/icons/SearchIcon";
import LoadingError from "../../components/loadingError/LoadingError";
// CSS
import classes from "./Home.module.css";

export default function Home() {
  const { data, loading, error } = useFetch();
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();
  const isDesktop = useMediaQuery();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("/login", { state: { isPush: true } });
      })
      .catch((error) => {
        console.error(error.code);
      });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterCategory(value);
  };

  const filteredData = data?.filter((item) =>
    item.category.includes(filterCategory)
  );

  return (
    <>
      {error ? (
        <LoadingError />
      ) : (
        <div className={classes.container}>
          <HeaderMobileForHome
            image={auth.currentUser?.photoURL}
            onClick={handleSignOut}
          />
          <section className={classes.headerContainer}>
            <h3 className={classes.welcomeText}>
              <small className={classes.welcomeTextSmall}>
                Hi,{" "}
                {auth.currentUser?.displayName
                  ? auth.currentUser?.displayName.split(" ")[0]
                  : auth.currentUser?.email?.split("@")[0]}
              </small>
              What are you looking for today?
            </h3>
            <div className={classes.wrapper}>
              <Input
                id={"searchBar"}
                type={"text"}
                name={"Search headphone"}
                onFocus={
                  isDesktop ? () => undefined : () => navigate("/search")
                }
                onFieldChange={() => undefined}
              >
                <SearchIcon size={"20"} color={"#BABABA"} />
              </Input>
            </div>
          </section>
          {!isDesktop ? (
            <section className={classes.showcase}>
              <div className={classes.showcaseContainer}>
                <Categories
                  filterSelected={filterCategory}
                  onChange={handleSelectChange}
                  group={"category"}
                />
                {!data || loading ? (
                  <BannerSkeleton />
                ) : (
                  <Carousel filteredData={filteredData} isBanner={true} />
                )}
                <Showcase
                  title={"Featured Products"}
                  condition={!data || loading}
                  filteredData={filteredData}
                />
              </div>
            </section>
          ) : (
            <>
              <div className={classes.wrapperCategories}>
                <Categories
                  filterSelected={filterCategory}
                  onChange={handleSelectChange}
                  group={"category"}
                />
              </div>
              {!data || loading ? (
                <section className={classes.carouselBanners}>
                  <BannerSkeleton />
                </section>
              ) : (
                <section className={classes.carouselBanners}>
                  <Carousel filteredData={filteredData} isBanner={true} />
                </section>
              )}
              <section className={classes.carouselCards}>
                <Showcase
                  title={"Featured Products"}
                  condition={!data || loading}
                  filteredData={filteredData}
                />
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
}