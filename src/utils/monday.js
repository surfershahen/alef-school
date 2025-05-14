const MONDAY_API_TOKEN = import.meta.env.VITE_MONDAY_API_TOKEN;
const MONDAY_BOARD_ID = import.meta.env.VITE_MONDAY_BOARD_ID;

export const createMondayItem = async formData => {
  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMwMDEwNjg2NiwiYWFpIjoxMSwidWlkIjo0NTM1MDYwNSwiaWFkIjoiMjAyMy0xMi0wMVQyMjoxNDo1Mi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTc2ODUxODcsInJnbiI6ImV1YzEifQ.qQ0d4kByTH_KERRJjwx-EoebQ5FtHytBV5pKBjjHZuI",
      },
      body: JSON.stringify({
        query: `
          mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
            create_item (
              board_id: $boardId,
              item_name: $itemName,
              column_values: $columnValues
            ) {
              id
            }
          }
        `,
        variables: {
          boardId: 1934675531,
          itemName: formData.name,
          columnValues: JSON.stringify({
            status: { label: "New Lead" },
            email: formData.email,
            phone: formData.phone,
          }),
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error) {
    console.error("Error creating Monday.com item:", error);
    throw error;
  }
};
