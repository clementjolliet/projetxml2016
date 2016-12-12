xquery version "3.0";

declare namespace json="http://www.json.org";

import module
    namespace request = "http://exist-db.org/xquery/request";

declare variable $search := request:get-parameter("search", "");
declare variable $start := request:get-parameter("start", 0);
declare variable $length := request:get-parameter("length", count(doc("merimee-MH.xml")/csv_data/row));

declare option exist:serialize "method=json media-type=application/json";

<json:value>
{
let $resultat := 
for $row in doc("merimee-MH.xml")/csv_data/row
where fn:contains($row/DPRO, $search)
return
    $row
        

for $return in subsequence($resultat, $start, xs:integer($length))
return
    <json:value  json:array="true">
        {$return/REF}
        {$return/ETUD}
        {$return/REG}
        {$return/DPT}
        {$return/COM}
        {$return/INSEE}
        {$return/TICO}
        {$return/ADRS}
        {$return/STAT}
        {$return/AFFE}
        {$return/PPRO}
        {$return/DPRO}
        {$return/AUTR}
        {$return/SCLE}
    </json:value>
}</json:value>