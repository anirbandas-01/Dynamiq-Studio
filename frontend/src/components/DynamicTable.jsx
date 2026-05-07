function DynamicTable({
  fields,
  records
}) {

  return (
    <div className="border rounded-xl p-6 overflow-x-auto">

      <h2 className="text-2xl font-semibold mb-4">
        Dynamic Table
      </h2>

      {records.length === 0 ? (

        <p>No records found.</p>

      ) : (

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              {fields.map((field, index) => (

                <th
                  key={index}
                  className="border p-2 text-left"
                >
                  {field.name}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {records.map((record, rowIndex) => (

              <tr key={rowIndex}>

                {fields.map((field, colIndex) => (

                  <td
                    key={colIndex}
                    className="border p-2"
                  >

                    {
                      record.data?.[field.name]
                    }

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default DynamicTable;