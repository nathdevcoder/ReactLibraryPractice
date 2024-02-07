 'use client'
 

export default function JSONViewer({json}: {json:string}) { 
  console.log(JSON.parse(json)); 
  
  return null
}
