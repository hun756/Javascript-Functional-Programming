const booksArr = [
    {
        name: "Example Book 01",
        author: "Unkown Author"
    },
    {
        name: "Example Book 02",
        author: "Mehmet Ekemen"
    }
];

const templateTable = `
<table>
    <thead>
        <tr>
        <th>Book Name</th>
        <th>Author</th>
        </tr>
    </thead>
    <tbody>
        <%
            _.each(booksArr, book => { %>
                <tr>
                    <td><%= book.name %></td>
                    <td><%= book.author %></td>
                </tr>
            <% }); %>
    </tbody>
</table>
`

document.body.innerHTML = 
    _.template(templateTable)(booksArr);