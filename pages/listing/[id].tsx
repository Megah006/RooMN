import type { GetStaticPaths, GetStaticProps } from "next";
import ListingDetail from "../../components/listings/[id]";

export default ListingDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "l1" } },
      { params: { id: "l2" } },
      { params: { id: "l3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
