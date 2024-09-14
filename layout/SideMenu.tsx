"use client"
import { urlFor } from "@/sanity/lib/image"
import navbarItems from "../Data/LinkData"
import { UserInfo } from "../component/interface/userInfo"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from 'next/navigation';


const SideMenu = () => {
  const router = useRouter()
  const {data:session}:any =  useSession()
    const data = session?.user
    const user:UserInfo = data?.data
  return (
    <div className={`w-[20%] h-screen  z-20 relative`}>
      <div className=" flex min-w-[20%] h-screen fixed left-0 flex-col justify-between border-e bg-white">
  <div className="px-4 py-6 overflow-y-auto">
    <div  className="flex w-full right-0 justify-end">
      <i  className="fa-solid fa-xmark md:hidden  text-2xl cursor-pointer"></i>
    </div>
    <span className="grid h-10 w-32 place-content-center rounded-lg  text-xs text-gray-600">
      {/* logo */}
            <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMjEuNzU0NjkiIHkxPSI4LjY2ODI1IiB4Mj0iMTAuMDE0MDYiIHkyPSI0My4zNTI2MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzI3OGIxMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJkZDE4MCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNS40MjE4OCIgeTE9IjI0LjgzMDc1IiB4Mj0iMjIuNzA2MjUiIHkyPSIyNS43NDk1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfVkxLYWZPa2szc0JYX2dyMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMyI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMC4wNzEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4yIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIwLjMyMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjAuNjIzIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMDUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNC4wMTI1IiB5MT0iNy42MjQ1IiB4Mj0iMzYuOSIgeTI9IjQxLjk2MDQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfVkxLYWZPa2szc0JYX2dyMyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjhmOWZhIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjZmODY0Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgdHJhbnNmb3JtPSJzY2FsZSg1LjMzMzMzLDUuMzMzMzMpIj48cGF0aCBkPSJNMTcuNjM0LDZoMTEuMzA1bC0xMS43MzYsMzQuNzczYy0wLjI0NywwLjczMyAtMC45MzQsMS4yMjYgLTEuNzA4LDEuMjI2aC04Ljc5OGMtMC45OTQsMCAtMS44LC0wLjgwNiAtMS44LC0xLjhjMCwtMC4xOTYgMC4wMzIsLTAuMzkgMC4wOTQsLTAuNTc2bDEwLjkzNSwtMzIuMzk2YzAuMjQ3LC0wLjczMyAwLjkzNCwtMS4yMjcgMS43MDgsLTEuMjI3eiIgZmlsbD0idXJsKCNjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEpIj48L3BhdGg+PHBhdGggZD0iTTM0LjA2MiwyOS4zMjRoLTE3LjkyN2MtMC40NTgsLTAuMDAxIC0wLjgzLDAuMzcxIC0wLjgzMSwwLjgyOWMwLDAuMjMxIDAuMDk1LDAuNDUxIDAuMjY0LDAuNjA4bDExLjUyLDEwLjc1MmMwLjMzNSwwLjMxMyAwLjc3NywwLjQ4NyAxLjIzNiwwLjQ4N2gxMC4xNTF6IiBmaWxsPSIjMDBmNjdkIj48L3BhdGg+PHBhdGggZD0iTTE3LjYzNCw2Yy0wLjc4MywtMC4wMDMgLTEuNDc2LDAuNTA0IC0xLjcxMiwxLjI1bC0xMC45MTcsMzIuMzQ1Yy0wLjMzNSwwLjkzNCAwLjE1MSwxLjk2NCAxLjA4NSwyLjI5OWMwLjE5NiwwLjA3IDAuNDAzLDAuMTA2IDAuNjEyLDAuMTA2aDkuMDI2YzAuNjg0LC0wLjEyMiAxLjI1LC0wLjYwMyAxLjQ4MSwtMS4yNTlsMi4xNzcsLTYuNDE2bDcuNzc2LDcuMjUzYzAuMzI2LDAuMjcgMC43MzUsMC40MTkgMS4xNTgsMC40MjJoMTAuMTE0bC00LjQzNiwtMTIuNjc2bC0xMi45MzEsMC4wMDNsNy45MTMsLTIzLjMyN3oiIGZpbGw9InVybCgjY29sb3ItMl9WTEthZk9razNzQlhfZ3IyKSI+PC9wYXRoPjxwYXRoIGQ9Ik0zMi4wNzQsNy4yMjVjLTAuMjQ3LC0wLjczMiAtMC45MzMsLTEuMjI1IC0xLjcwNiwtMS4yMjVoLTEyLjZjMC43NzIsMCAxLjQ1OSwwLjQ5MyAxLjcwNSwxLjIyNGwxMC45MzUsMzIuMzk5YzAuMzE4LDAuOTQyIC0wLjE4OCwxLjk2MyAtMS4xMywyLjI4MWMtMC4xODUsMC4wNjQgLTAuMzc5LDAuMDk2IC0wLjU3NSwwLjA5NmgxMi42YzAuOTk0LDAgMS44LC0wLjgwNiAxLjgsLTEuODAxYzAsLTAuMTk2IC0wLjAzMiwtMC4zOSAtMC4wOTUsLTAuNTc1eiIgZmlsbD0idXJsKCNjb2xvci0zX1ZMS2FmT2trM3NCWF9ncjMpIj48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"/>
      {/* logo */}
    </span>

    <ul className="mt-6 space-y-1">
  {navbarItems.map((items, index) => {
    return (
      <li key={`nav-item-${index}`}> {/* Unique key for top-level items */}
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            onClick={() => {
              if (!items.subLinks) {
                router.push(`/${items.text.toLowerCase().trim()}`);
              }
            }}
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium">{items.text}</span>

            {items.subLinks && (
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </summary>

          {items.subLinks && (
            <ul className="mt-2 space-y-1 px-4">
              {items.subLinks.map((item, subIndex) => (
                <Link
                  key={`sub-link-${index}-${subIndex}`} 
                  href={`/${items.text.trim().toLowerCase()}/${item.text.replace(/\s+/g, '').trim().toLowerCase()}`}
                >
                  <li>
                    <p className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      {item.text}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </details>
      </li>
    );
  })}
</ul>

  </div>

  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
        alt=""
        src={ user ? urlFor(user.profilePic).url() : ""}
        className="size-10 rounded-full object-cover"
      />

      <div>
        <p className="text-xs">
          <strong className="block font-medium">{user?.name[0].toUpperCase()}{user?.name.slice(1)}</strong>

          <span className="truncate"> {user?.email} </span>
        </p>
      </div>
    </a>
  </div>
</div>
    </div>
  )
}

export default SideMenu