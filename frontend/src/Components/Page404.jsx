const BuildPage = (index) => (
  <>
    <h3>
      Page
      {index}
    </h3>
    <div>Page not found.</div>
  </>
);

const Page404 = () => BuildPage(404);

export default Page404;
