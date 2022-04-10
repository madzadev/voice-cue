import { useState } from "react";
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

const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { Tab, TabList, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [audioWaveForm, setAudioWaveForm] = useState();
  const [audio, setAudio] = useState(false);
  const [dGTranscript, setDGTranscript] = useState();

  return (
    <div className={styles.container}>
      <ViewSplitter>
        <div>
          <h1 className={styles.title}>Decode the voice with VoiceCue</h1>
          <h3 className={styles.subtitle}>
            Find sentiments, tags, entities, actions instantly
          </h3>
          <FileSelector setAudio={setAudio} setDGTranscript={setDGTranscript} />
        </div>
        <div style={{ display: "grid", placeItems: "center end" }}>
          <Player
            audio={audio}
            audioWaveForm={audioWaveForm}
            dGTranscript={dGTranscript}
          />
        </div>
      </ViewSplitter>
      <WaveForm
        url={!audio ? "samples/demo.mp3" : audio}
        setAudioWaveForm={setAudioWaveForm}
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
          <Overview audioWaveForm={audioWaveForm} dGTranscript={dGTranscript} />
        </TabPanel>
        <TabPanel>
          <Sentiments
            audioWaveForm={audioWaveForm}
            dGTranscript={dGTranscript}
          />
        </TabPanel>
        <TabPanel>
          <TagCloud audioWaveForm={audioWaveForm} dGTranscript={dGTranscript} />
        </TabPanel>
        <TabPanel>
          <Entity audioWaveForm={audioWaveForm} dGTranscript={dGTranscript} />
        </TabPanel>
        <TabPanel>
          <Actions audioWaveForm={audioWaveForm} dGTranscript={dGTranscript} />
        </TabPanel>
        <TabPanel>
          <Search audioWaveForm={audioWaveForm} dGTranscript={dGTranscript} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
