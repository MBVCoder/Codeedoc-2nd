import Dashboard from "@components/Dashboard"
import UserTable from "@components/UserTable"

const Home = () => {
	
	return (
		<div className="flex flex-col gap-10 w-full bg-[#0F2027]">
			<Dashboard />
			<div>
				<UserTable />
			</div>
		</div>
	)
}

export default Home
