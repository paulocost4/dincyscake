import { useEffect } from "react"
import Head from "next/head";
export default function GoogleAds(props){
    
    useEffect(()=>{
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        document.querySelector("#__next > div > div > ins").style.backgroundColor = '#c1c1c1'
        document.querySelector("#__next > div > div > ins").innerText = 'Propaganda em construção'
    }, [])

    return(
            
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1969421957779330"
            data-ad-slot={props.slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
            
    )
}

{/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1969421957779330"
     crossorigin="anonymous"></script>
<!-- Banner Horizontal up -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1969421957779330"
     data-ad-slot="2194687109"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */}