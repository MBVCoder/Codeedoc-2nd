const Fields = ({label, count}:{label:string, count:number}) => {
	return (
		<div>
			<div className=" border-[1px] border-white rounded-4xl hover:-translate-y-2 duration-400 bg-[#0F2027] inset-shadow-sm inset-shadow-black">
          <div className=" p-2 text-white text-center">
            <span className="font-semibold text-md ">{label} : </span>{" "}
            {count}
          </div>
        </div>
		</div>
	)
}

export default Fields
