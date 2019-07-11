import React from "react";
//TODO: Use Trie To Speed Up Suggestion
class Util{
    static build(row) {
        const info = row['_source'];
        const name = info['Artist'];
        const year = info['Year'];
        const rank = info['Rank'];
        const song = info['Song'];
        const id = row['_id'];
        return (
            <tr key={id}>
                <td className="artists-name"> {name}</td>
                <td className="artists-rank"> {rank}</td>
                <td className="artists-song"> {song}</td>
                <td className="artists-awarded-week"> {year}</td>
            </tr>
        );
    }
}

export default Util;