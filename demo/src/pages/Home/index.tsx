import { motion } from "framer-motion";
import PageHeader from './components/PageHeader';
import Hr from './components/Hr';
import AdjustableDemo from './components/AdjustableDemo';
import { RevealEffectConfig } from '../../RevealEffect';
import { Container } from "@mui/material";

export default () => (
  <Container maxWidth="xl">
    <RevealEffectConfig mountOnBody={false}><PageHeader /></RevealEffectConfig>
    <Hr />
    <RevealEffectConfig mountOnBody={false}><AdjustableDemo /></RevealEffectConfig>
    <Hr />
  </Container>
);
