import { CategoryArticle } from "@/models/categoryArticle"


// interface Props {
//     data:CategoryArticle[],
//     columns: string[]
// }

export default function TableComponent() {

    return(
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        {/* <div className="overflow-hidden">
                            <table
                            className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                            <thead
                                className="border-b border-neutral-200 font-medium dark:border-white/10">
                                <tr>
                                    {
                                        columns.map((column , index) => <th key={index} scope="col" className={`px-6 py-4`}>{column}</th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        data?.map((row : any,indexRow) => (

                                            <tr key={row?.id} className="border-b border-neutral-200 dark:border-white/10">
                                                {
                                                    columns.map((column : any , indexColumn : number) => (
                                                        <td className={`whitespace-nowrap px-6 py-4`}>{row[column]}</td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                            </tbody>
                            </table>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
