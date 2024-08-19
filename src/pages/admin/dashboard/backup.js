<TabPanel>
  {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
  <div className="relative overflow-x-auto mb-16">
    <h1
      className=" text-center mb-5 text-3xl font-semibold underline"
      style={{ color: mode === "dark" ? "white" : "" }}
    >
      Order Details
    </h1>

    {order.map((allorder, index) => {
      return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-black uppercase bg-gray-200 "
            style={{
              backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                Payment Id
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Pincode
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          {allorder.cartItems.map((item, index) => {
            // console.log(allorder)
            const { title, description, category, imageUrl, price } = item;
            return (
              <tbody>
                <tr
                  className="bg-gray-50 border-b  dark:border-gray-700"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    pay_{Math.ceil(Math.random() * 1000000)}
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    <img className="w-16" src={imageUrl} alt="img" />
                  </th>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {title}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    ₹{price}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {category}
                  </td>

                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {allorder.addressInfo.name}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {allorder.addressInfo.address}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {allorder.addressInfo.pincode}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {allorder.addressInfo.phoneNumber}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {allorder.email}
                  </td>
                  <td
                    className="px-6 py-4 text-black "
                    style={{
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    {allorder.date}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      );
    })}
  </div>
</TabPanel>;
