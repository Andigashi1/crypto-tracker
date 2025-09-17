import Market from './components/Market'

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const params = await searchParams;
  const pageNumber = parseInt(params.page ?? '1', 10);
  return (
    <div>
      <div>
        <Market page={pageNumber} />
      </div>
    </div>
  );
}

export default page