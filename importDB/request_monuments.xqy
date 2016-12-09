xquery version "3.0";


declare namespace json = "http://www.json.org";


declare option exist:serialize "method=json media-type=application/json";

import module
    namespace request = "http://exist-db.org/xquery/request";
    
declare variable $search := request:get-parameter("search", "");
declare variable $start := request:get-parameter("start", 0);
declare variable $length := request:get-parameter("length", count(doc("merimee-MH.xml")/csv_data/row));

<json:value json:array="true">
{
    for $row in subsequence(doc("merimee-MH.xml")/csv_data/row, $start, $length)
    where fn:contains($row/REF, $search)
    or fn:contains($row/ETUD, $search)
    or fn:contains($row/REG, $search)
    or fn:contains($row/DPT, $search)
    or fn:contains($row/COM, $search)
    or fn:contains($row/INSEE, $search)
    or fn:contains($row/TICO, $search)
    or fn:contains($row/ADRS, $search)
    or fn:contains($row/STAT, $search)
    or fn:contains($row/AFFE, $search)
    or fn:contains($row/PPRO, $search)
    or fn:contains($row/DPRO, $search)
    or fn:contains($row/AUTR, $search)
    or fn:contains($row/SCLE, $search)
    return
    <json:value>
        { $row/REF }
        { $row/ETUD }
        { $row/REG }
        { $row/DPT }
        { $row/COM }
        { $row/INSEE }
        { $row/TICO }
        { $row/ADRS }
        { $row/STAT }
        { $row/AFFE }
        { $row/PPRO }
        { $row/DPRO }
        { $row/AUTR }
        { $row/SCLE }
    </json:value>
}
</json:value>