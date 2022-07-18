import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Headroom from "headroom.js";
// import RecentComment from "../RecentComment";
export default function (props: {
  author: string;
  desc: string;
  logo: string;
  postNum: number;
  catelogNum: number;
  tagNum: number;
  walineServerUrl: string;
}) {
  useEffect(() => {
    const el = document.querySelector("#author-card");
    if (el) {
      const headroom = new Headroom(el, {
        classes: {
          initial: "side-bar",
          pinned: "side-bar-pinned",
          unpinned: "side-bar-unpinned",
          top: "side-bar-top",
          notTop: "side-bar-not-top",
        },
      });
      headroom.init();
    }
  });
  return (
    <div id="author-card" className="fixed ">
      <div className="w-52 flex flex-col justify-center items-center bg-white py-6 px-10 card-shadow ml-2 dark:bg-dark dark:card-shadow-dark">
        <Image
          className="rounded-full hover:rotate-180 duration-500 transition-all dark:filter-dark"
          src={props.logo}
          width={120}
          height={120}
        ></Image>

        <div className="mt-2 font-semibold text-gray-600 mb-2 dark:text-dark">
          {props.author}
        </div>
        <div className="text-sm text-gray-500 mb-2 dark:text-dark-light">
          {props.desc}
        </div>
        <div className="flex">
          <Link href="/timeline">
            <a className="group flex flex-col justify-center items-center text-gray-600 text-sm px-1 dark:text-dark">
              <div className="font-bold group-hover:text-cyan-400">
                {props.postNum}
              </div>
              <div className="group-hover:text-cyan-400 text-gray-500 dark:text-dark-light">
                日志
              </div>
            </a>
          </Link>
          <Link href="/category">
            <a className="group flex flex-col justify-center items-center text-gray-600 text-sm px-1 dark:text-dark">
              <div className="font-bold group-hover:text-cyan-400">
                {props.catelogNum}
              </div>
              <div className="group-hover:text-cyan-400 text-gray-500 dark:text-dark-light">
                分类
              </div>
            </a>
          </Link>
          <Link href="/tag">
            <a className="group flex flex-col justify-center items-center text-gray-600 text-sm px-1 dark:text-dark">
              <div className="group-hover:text-cyan-400 font-bold">
                {props.tagNum}
              </div>
              <div className=" group-hover:text-cyan-400 text-gray-500 dark:text-dark-light">
                标签
              </div>
            </a>
          </Link>
        </div>
      </div>
      {/* <RecentComment
        walineServerUrl={props.walineServerUrl}
        count={10}
      ></RecentComment> */}
    </div>
  );
}
