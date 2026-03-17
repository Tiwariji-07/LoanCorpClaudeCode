export default async function LoanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>Loan Detail: {id}</div>
}
