import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import FileSelector from "../components/FileSelector";
import Overview from "../components/Overview";
import Sentiments from "../components/Sentiments";
import TagCloud from "../components/TagCloud";
import Entity from "../components/Entity";
import Actions from "../components/Actions";
import Search from "../components/Search";
import ViewSplitter from "../components/ViewSplitter";
import Player from "../components/Player";

const WaveForm = dynamic(() => import("../components/WaveForm"), {
  ssr: false,
});

import { transcription } from "../data/transcription";
import getOccurrences from "../helpers/wordcloud";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import styles from "../styles/Home.module.css";

export default function Home() {
  // console.log(sentiment.analyze(data.transcript));
  const [globalWaveForm, setGlobalWaveForm] = useState();
  const [audio, setAudio] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>HotCues</title>
        <meta
          name="description"
          content="Find sentiments, tags, entities, actions instantly"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewSplitter>
        <div>
          <h1 className={styles.title}>
            Explore audio with HotCues{" "}
            <span style={{ color: "red" }}>| | |</span>
          </h1>
          <h3 className={styles.subtitle}>
            Find sentiments, tags, entities, actions instantly
          </h3>
          <FileSelector setAudio={setAudio} />
        </div>
        <div style={{ display: "grid", placeItems: "center end" }}>
          <Player globalWaveForm={globalWaveForm} audio={audio} />
        </div>
      </ViewSplitter>

      <WaveForm
        url={!audio ? "samples/demo.mp3" : audio}
        setGlobalWaveForm={setGlobalWaveForm}
      />

      <Tabs className={styles.tabs}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Sentiment</Tab>
          <Tab>Tag Cloud</Tab>
          <Tab>Entities</Tab>
          <Tab>Actions</Tab>
          <Tab>Search</Tab>
        </TabList>

        <TabPanel>
          <Overview globalWaveForm={globalWaveForm} />
        </TabPanel>
        <TabPanel>
          <Sentiments />
        </TabPanel>
        <TabPanel>
          <TagCloud
            data={getOccurrences(transcription.words)}
            globalWaveForm={globalWaveForm}
          />
        </TabPanel>
        <TabPanel>
          <Entity globalWaveForm={globalWaveForm} />
        </TabPanel>
        <TabPanel>
          <Actions globalWaveForm={globalWaveForm} />
        </TabPanel>
        <TabPanel>
          <Search globalWaveForm={globalWaveForm} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
