import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => (
  <Layout>
    <br />
    <Link href="/">
      <a> Welcome to PiBox! Start Exploring Now</a>
    </Link>
    <p>I am home</p>
  </Layout>
);

export default Index;