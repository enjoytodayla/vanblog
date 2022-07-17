import { getPublicAll } from "../api/getMeta";
import AuthorCard from "../components/AuthorCard";
import Layout from "../components/layout";
import TimeLineItem from "../components/TimeLineItem";
import { Article } from "../types/article";
import { wordCount } from "../utils/wordCount";
interface IndexProps {
  ipcNumber: string;
  since: string;
  ipcHref: string;
  logo: string;
  categories: string[];
  author: string;
  desc: string;
  authorLogo: string;
  postNum: number;
  catelogNum: number;
  tagNum: number;
  articles: Record<string, Article[]>;
  wordTotal: number;
}
const Home = (props: IndexProps) => {
  return (
    <Layout
      title={"时间线"}
      ipcNumber={props.ipcNumber}
      ipcHref={props.ipcHref}
      since={new Date(props.since)}
      logo={props.logo}
      categories={props.categories}
      sideBar={
        <AuthorCard
          catelogNum={props.catelogNum}
          postNum={props.postNum}
          tagNum={props.tagNum}
          author={props.author}
          logo={props.authorLogo}
          desc={props.desc}
        ></AuthorCard>
      }
    >
      <div className="bg-white border py-4 px-8 md:py-6 md:px-8">
        <div>
          <div className="text-2xl md:text-3xl text-gray-700 text-center">
            时间线
          </div>
          <div className="text-center text-gray-600 text-sm mt-2 mb-4 font-light">{`${props.catelogNum} 分类 × ${props.postNum} 文章 × ${props.tagNum} 标签 × ${props.wordTotal} 字`}</div>
        </div>
        <div className="flex flex-col mt-2">
          {Object.keys(props.articles)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((eachDate: string) => {
              return (
                <TimeLineItem
                  defaultOpen={true}
                  key={eachDate}
                  date={eachDate}
                  articles={props.articles[eachDate]}
                ></TimeLineItem>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
export async function getStaticProps(): Promise<{ props: IndexProps }> {
  const data = await getPublicAll();
  const siteInfo = data.meta.siteInfo;
  const { beianUrl, beianNumber, since, siteLogo } = siteInfo;
  const postNum = data.articles.length;
  const tagNum = data.tags.length;
  const catelogNum = data.categories.length;
  let wordTotal = 0;
  data.articles.forEach((a) => {
    wordTotal = wordTotal + wordCount(a.content);
  });
  const articles = {} as any;
  const dates = Array.from(
    new Set(data.articles.map((a) => new Date(a.createdAt).getFullYear()))
  );
  for (const date of dates) {
    const curDateArticles = data.articles
      .filter((each) => {
        return new Date(each.createdAt).getFullYear() == date;
      })
      .map((each) => {
        return {
          title: each.title,
          id: each.id,
          createdAt: each.createdAt,
          updatedAt: each.updatedAt,
        };
      });
    articles[String(date)] = curDateArticles;
  }
  return {
    props: {
      wordTotal,
      ipcHref: beianUrl,
      ipcNumber: beianNumber,
      since: since,
      logo: siteLogo,
      categories: data.categories,
      author: siteInfo.author,
      desc: siteInfo.authorDesc,
      authorLogo: siteInfo.authorLogo,
      postNum: postNum,
      tagNum: tagNum,
      catelogNum: catelogNum,
      articles: articles,
    },
  };
}