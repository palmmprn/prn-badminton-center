/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { UserProfile, AcademyModule } from "../types";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Play,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  Download,
  Flame,
  Volume2,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface OnlineAcademyProps {
  user: UserProfile;
  onChangeUser: (updated: UserProfile) => void;
}

const ACADEMY_CURRICULUM: AcademyModule[] = [
  {
    id: "mod-1",
    title: "1. ทักษะจับไม้และฟุตเวิร์คระดับพื้นฐาน (Grip & Footwork Masterclass)",
    titleThai: "เทคนิคการจับไม้แบบ V-Shape และการก้าวเท้าเคลื่อนที่ความคล่องตัวสูง",
    lessons: [
      {
        id: "les-1-1",
        title: "Forehand & Backhand Grip Methods",
        titleThai: "เทคนิคการจับไม้หน้ามือและหลังมือแบบ V-Shape",
        duration: "10 mins",
        difficulty: "Beginner",
        description: "การเรียนรู้มุมจับหน้าไม้เพื่อควบคุมทิศทางลูกหยอดและลูกเคลียร์ได้อย่างสมบูรณ์แบบ หลีกเลี่ยงหน้าไม้รูปหน้ากระทะ",
        descriptionThai: "วีแชป (V-Shape) คือพื้นฐานจุดหมุนของข้อนิ้วโป้งและนิ้วชี้ในการรีดพลังตบและสะบัดข้อมือที่ดีที่สุด",
        youtubeId: "sS6A9Kj54K0",
        points: 100,
        steps: [
          { title: "ขั้นตอนที่ 1: V-Shape Alignment", details: "วางสันไม้แบดมินตันระหว่างนิ้วโป้งและนิ้วชี้ ปรับมุมสัมผัสหลวมระนาบตรง" },
          { title: "ขั้นตอนที่ 2: Backhand Thumb Lever", details: "เลื่อนนิ้วโป้งขึ้นมากดดันแป้นแบนของด้ามจับช่วยเพิ่มแรงดีดลูกหลังมือ" },
          { title: "ขั้นตอนที่ 3: Finger Relaxation", details: "กำด้ามจับด้วยความผ่อนคลาย บีบไม้เฉพาะเสี้ยววินาทีที่หน้าไม้กระทบกับลูก" },
        ],
      },
      {
        id: "les-1-2",
        title: "Six-Point Court Mobility Movement",
        titleThai: "การก้าวเท้าเคลื่อนที่ 6 จุดอเนกประสงค์",
        duration: "15 mins",
        difficulty: "Beginner",
        description: "หลักสูตรฝึกซ้อมสเต็ปฟุตเวิร์คการสไลด์และถอยก้าวคอร์ทแบดเพื่อเข้าจุดตีได้รวดเร็วที่สุดโดยสูญเสียพลังงานน้อยที่สุด",
        descriptionThai: "รวมตำแหน่งวิ่งไปแดนหน้า กลาง และหลัง ครอบคลุมทั่วทั้งสนาม",
        youtubeId: "sOxlC_3w7y0",
        points: 100,
        steps: [
          { title: "ขั้นตอนที่ 1: Chassé Step", details: "เคลื่อนที่สไลด์ด้านข้างโดยไม่กระโดดข้ามขาสลับคอยควบคุมสมดุลลำตัว" },
          { title: "ขั้นตอนที่ 2: Final Lunge", details: "ก้าวเท้านำตัวตีออกไปข้างหน้าพร้อมงอเข่าขวาทำมุม 90 องศาเพื่อรักษาน้ำหนักสะโพก" },
          { title: "ขั้นตอนที่ 3: Recover Push", details: "ออกแรงถีบข้อเท้าขวาเพื่อสปริงตัวถอยกลับมาจุดกึ่งกลางสนาม (Center Court)" },
        ],
      },
    ],
    quiz: [
      {
        id: "qz-1-1",
        question: "การจับไม้แบบ Forehand V-Shape ร่องนิ้วหัวแม่มือและนิ้วชี้ควรอยู่พิกัดใดของด้ามจับเป็นหลัก?",
        options: [
          "อยู่ด้านแนวแบนกว้างที่สุดของด้ามจับ",
          "อยู่ระนาบเดียวกับขอบสัน (Apex) ของด้ามไม้",
          "กำหลวมเป็นรูปวงกลมโดยไม่ต้องมีจุดสังเกต",
          "จับบริเวณส่วนบนสุดใกล้คอไม้ให้แน่นที่สุดตลอดเวลา",
        ],
        correctIndex: 1,
        explanation: "ร่อง V-Shape ระหว่างนิ้วโป้งและนิ้วชี้จะอยู่ระนาบเดียวกับแนวสันไม้ เพื่อให้เราสามารถปรับหน้าไม้ Forehand และตัดเฉือนได้อย่างอิสระ",
      },
      {
        id: "qz-1-2",
        question: "เมื่อต้องการหมุนเปลี่ยนสลับมาตีบวกแฮนด์ทุบหลังมือ (Backhand) ตรรกะนิ้วโป้งควรปรับแรงส่งที่จุดใด?",
        options: [
          "เลื่อนนิ้วโป้งขึ้นมาวางบนขอบหนามเฉลียงแคบล่างสุด",
          "ทาบกดแผ่นนิ้วโป้งด้านหลังลงบนแป้นแบนกว้างด้านตรงข้ามตาข่ายเพื่อสร้างมุม Leverage สปริงตัวส่ง",
          "กำขยำรวมนิ้วทั้งห้าให้เกร็งแน่นที่ด้ามปลอก",
          "หงายท่อนแขนแบออกเพื่อหักข้อมือลงด้านข้าง",
        ],
        correctIndex: 1,
        explanation: "การนำวิถีหน้าแผ่นเรียบนิ้วโป้งมากดที่ส่วนแบนกว้าง (Bevel/Flat Grip) ช่วยเพิ่มพาวเวอร์แรงงัดและแรงดีดสะบัดของข้อมือหลังมือได้อย่างมีพลังที่สุด",
      },
      {
        id: "qz-1-3",
        question: "ในการทำ Lunge (ก้าวเท้านำตัวเข้ากระแทกกวาดตีลูกหน้าเน็ต) จุดสำคัญในการรักษาความปลอดภัยของหัวเข่าคือข้อใด?",
        options: [
          "เหยียดงอเข่าให้สุดเลยปลายเท้ายิ่งยืดยาวข้ามแดนยิ่งดี",
          "งอเชิดเท้านำขนานยึดเข่าให้มุมต้นขาทำมุม 90 องศา และเข่าไม่ส่งน้ำหนักเกินแนวปลายเท้า",
          "ยืนสองขากว้างเกร็งก้าวตรงไม่ยอมงอข้อเท้า",
          "ให้เข่าบิดปรีสไลด์เอาน้ำหนักลื่นไหลทั้งหมดลงไปที่หัวเข่าด้านข้าง",
        ],
        correctIndex: 1,
        explanation: "การรักษาทิศทางเข่าไม่ให้เลยปลายเท้าและรักษาข้อเข่าขวาไว้ที่ประมาณ 90 องศา ป้องกันการบาดเจ็บรุนแรงของเส้นเอ็นกระดูกข้อเข่า",
      },
      {
        id: "qz-1-4",
        question: "เมื่อตีลูกหยอดหน้าเน็ตเสร็จเรียบร้อยแล้ว ในมุมสเต็ปฟุตเวิร์ค ลำดับขั้นต่อไปคือกิจกรรมใด?",
        options: [
          "ยืนกระหยิ่มรอดูผลลัพธ์ว่าลูกเข้าหรือออกเน็ต",
          "ดันส้นเท้าสปริงกลับมาที่ 'จุดกึ่งกลางคอร์ท (Center Frame)' เพื่อเตรียมพร้อมตีมุมรอบคอร์ทถัดไป",
          "ก้าวไขว้หลังถอยพุ่งหลังคอร์ทมุมเฉียงซ้ายทันที",
          "ย่อตกลงคลานราบเพื่อขนาบต่ำข้างเส้นเน็ตคอร์ท",
        ],
        correctIndex: 1,
        explanation: "การ Recovery กลับจุดกึ่งกลางคือหัวใจวิชาฟุตเวิร์คเพื่อรับมือแต้มถัดไปจากคู่เล่นที่อาจหยอดซ้ำหรือโยนเคลียร์สอยหลัง",
      },
    ],
  },
  {
    id: "mod-2",
    title: "2. ลูกหยอดเฉือนตาข่ายและเคลียร์คอร์ทสูง (Precision Drop Shots & Clears)",
    titleThai: "เทคนิคการตัดลูกหยอดวิถีสปินเลียดเน็ตและการโยนเคลียร์ขึงแดนหลัง",
    lessons: [
      {
        id: "les-2-1",
        title: "Forehand Slicing Drop Shot",
        titleThai: "ลูกตัดหยอดปั่นสปินหน้าเน็ตยอดเยี่ยม",
        duration: "12 mins",
        difficulty: "Intermediate",
        description: "วิธีการหั่นหน้าไม้สัมผัสด้านข้างของขนนกเบาๆ ทำให้วิถีลูกเลียดตาข่ายม้วนตกลงอย่างฉับพลัน",
        descriptionThai: "ผู้เล่นตรงข้ามเดาจุดตกยากเนื่องจากเป็นท่าเลียนแบบลูกตบหัวไหล่เดียวกัน",
        youtubeId: "gS6U7p8y_jU",
        points: 150,
        steps: [
          { title: "ขั้นตอนที่ 1: Same Setup As Smash", details: "ตั้งหลักโยนไหล่และเหยียดมือซ้ายขึ้นทำท่าตบลูกเรียกร้องจุดสังเกตจากคู่ต่อสู้" },
          { title: "ขั้นตอนที่ 2: Soft Slicing Angle", details: "จังหวะส่งไม้ให้หมุนเอียงหน้าไม้ 30 องศาตัดหั่นแฉลบข้างขอบหัวลูกแทนการปะทะตรง" },
          { title: "ขั้นตอนที่ 3: Net Rolling Follow-Through", details: "หยุดสะบัดข้อมือเบรกแรงผลักช่วยให้ลูกเฉียดเน็ตแนวนอนตกทันที" },
        ],
      },
      {
        id: "les-2-2",
        title: "Overhead Defensive Clear",
        titleThai: "ลูกโยนสูงเคลียร์ข้ามหลังกดดันแดนหลัง",
        duration: "12 mins",
        difficulty: "Intermediate",
        description: "การตีลูกข้ามศีรษะให้โด่งสูงสุดและเหหันดิ่งลงมาบนเส้นฐานหลังคอร์ท เพื่อเปิดโอกาสให้เราตั้งรับหรือบีบคู่ต่อสู้",
        descriptionThai: "การสร้างระยะวิถีดิ่งจำกัดสปีดฝ่ายรุกของศัตรูให้ล่าถอย",
        youtubeId: "q_7tD_0uVig",
        points: 100,
        steps: [
          { title: "ขั้นตอนที่ 1: Deep Backpedal Setup", details: "สวมฟุตเวิร์คถอยหลังพิงตัว คอยรับใต้พิกัดลูกพร้อมเอี้ยวตัว 45 องศา" },
          { title: "ขั้นตอนที่ 2: Full Extension Contact", details: "เกร็งบิดผลักส่งแรงข้อศอกเหยียดแขนขวาสูง ตีสัมผัสปะทะตรงเต็มหน้าแร็กเก็ต" },
          { title: "ขั้นตอนที่ 3: Complete Arm Follow", details: "ตวัดวาดมุมไม้ผ่อนทิศทางปลายไม้ลงข้างซีกตัวเพื่อความปลอดภัยของไหล่" },
        ],
      },
    ],
    quiz: [
      {
        id: "qz-2-1",
        question: "ข้อดีหลักที่ใช้ท่าเตรียมแบบเดียวกับลูกตบ (Smash Setup) ในการเล่นลูกตัดหยอด (Slicing Drop) คือข้อใด?",
        options: [
          "เพื่อเพิ่มพลังตัดลูกให้เกิดเสียงดังกระหึ่มขึ้น",
          "เพื่อหลอกล่อให้คู่ต่อสู้อยู่ในโซนถอยหลังและตั้งหลักรับตบ ป้องกันการเข้ามาแย่งตะครุบหน้าเน็ต",
          "เพื่อให้ข้อมือไม่เหนื่อยจากการขยับ",
          "ทำให้ตัวไม้หมุนได้ 360 องศา",
        ],
        correctIndex: 1,
        explanation: "การทำ Deception (หลอกล่อ) ด้วยการใช้วงสวิงท่าเดียวกันทำให้คู่ต่อสู้จับจังหวะวิถีไม่ได้ และถอยคอร์ทเพื่อคอยรับสแมช",
      },
      {
        id: "qz-2-2",
        question: "วิธีกระทบแรงสะกดหน้าไม้สัมผัสประเภท Slicing Drop ให้ได้ผลวิถีลูกเลียดตกข้ามทันที?",
        options: [
          "สัมผัสปะทะหน้าเต็มส่งแรงสปีด 100% ตรงเข้าหาลูกดิ่งลง",
          "หมุนขัดทำมุมแปรผันเอียง 30-45 องศาเฉือนกวาดปีกหัวลูกขนไก่แหลบตรงข้าง",
          "ดึงกวาดไม้ถอยหลังขณะปล่อยให้หัวขนชนไม้เอง",
          "ตบหักสันแร็กเก็ตด้านเหล็กลงฟันตรง",
        ],
        correctIndex: 1,
        explanation: "การเอียงสไลด์เฉือนหน้าไม้กับข้างขนนกและหัวคอร์ก ช่วยตัดแรงสะกดลดความเร็วและสร้างรอบหมุนสปินทำให้วิถีลูกแหวกลาดเฉียดตาข่ายได้ยอดเยี่ยม",
      },
      {
        id: "qz-2-3",
        question: "ลักษณะวิถีลูกโยนสูงเซฟเคลียร์ (High Overhead Clear) ที่มีประสิทธิภาพสูงสุดคืออย่างไร?",
        options: [
          "พุ่งร่อนต่ำขนานทางยาวขนานกับขอบคอร์ทสะท้อนตาข่าย",
          "ส่งลูกโด่งข้ามโค้งวาดฟองอากาศสูงลอยลึกตกเกือบเป็นมุมแนวดิ่งลงเส้นหลังสุดของเขตคู่แข่ง",
          "ส่งหมุนซิกแซกในแนวแดนกลางตาข่าย",
          "สอยตรงให้ลูกสบตาข่ายแล้วตกฝั่งตนเองเพื่อหยอดผืนหญ้า",
        ],
        correctIndex: 1,
        explanation: "ลูกเคลียร์ที่ดีต้องมีระดับความสูงและลึกมากพอบังคับให้คู่ต่อสู้ต้องถอยหลังไกลสุด และจำใจเล่นลูกแดนหลังพร้อมทั้งเพิ่มเวลาให้เราจัดท่าพร้อมรับ",
      },
      {
        id: "qz-2-4",
        question: "การกระจายพาวเวอร์ร่างกายเพื่อช่วยซับพอร์ตแรงเหวี่ยงตีลูกเคลียร์ (Defensive Clear) เริ่มต้นโอนถ่ายจากบริเวณใดของแผ่นตัว?",
        options: [
          "ใช้แรงจลนศาสตร์ข้อนิ้วก้อยกำเฉือนแรง",
          "ส่งถ่ายน้ำหนักตัวโดยสปริงสะโพกและแรงเหยียดส่งเอี้ยวขาออกจากไหล่และหลังบิด",
          "เอียงข้างใช้แค่กำลังข้อมือด้านล่างนิ่งๆ คีบไม้",
          "งอโค้งลำตัวแอ่งไปด้านหน้าบิดลำไส้เกร็งหัวเข่า",
        ],
        correctIndex: 1,
        explanation: "การส่งน้ำหนักสลับจากสะโพกหลังหมุนโผล่มาหน้าตัว เป็นตัวกระตุ้นสิริพาวเวอร์ที่ทำให้เกิดวงเหวี่ยงแขนสูงเบาสบายแต่วิถีลูกเคลียร์ลอยตกลึกเกลี้ยงได้ง่ายดาย",
      },
    ],
  },
  {
    id: "mod-3",
    title: "3. ลูกตบสแมชทรงพลังระดับโปร (Explosive Smash Power & Jumps)",
    titleThai: "สายโซ่จลนศาสตร์ระเบิดพลังทุบทำลายล้างและการคุมไทมิ่งกระโดดตบสแมช",
    lessons: [
      {
        id: "les-3-1",
        title: "Kinetic Chain Power Transfer",
        titleThai: "การต่อยอดสายโซ่จลนศาสตร์บิดสะโพกส่งแรงตบตระหง่าน",
        duration: "20 mins",
        difficulty: "Advanced",
        description: "เรียนรู้พิกัดสวิงโถมน้ำหนักส่งถ่ายน้ำหนักลำตัวจาก ปลายเท้า-สะโพก-หัวไหล่ และข้อมือ เพื่อรีดสปีดลูกตบทะลุ 350+ km/h",
        descriptionThai: "วิธีตบแบบถูกต้องเพื่อถนอมเซฟข้อศอกและไหล่พาวเวอร์ฟูล",
        youtubeId: "B_wSshh-Y7I",
        points: 200,
        steps: [
          { title: "ขั้นตอนที่ 1: Body Coiling Setup", details: "ยืนด้านข้างบิดหัวไหล่ขวาไปข้างหลัง บิดสะโพกเปิดหน้าอกรับพลังสะสมคล้ายคันธนู" },
          { title: "ขั้นตอนที่ 2: Hip Rotation Core Drive", details: "หมุนสะโพกสวนทางอย่างรุนแรง โยนไหล่ขวาเหยียดเข้าหาจุดตีก่อนฟาด" },
          { title: "ขั้นตอนที่ 3: Forearm Pronation", details: "คว่ำปลายท่อนแขนสะบัดสแน็ปข้อมือวินาทีสุดท้ายเพื่อให้จุดตกพุ่งทะลุดิ่งลงล่างสุด" },
        ],
      },
      {
        id: "les-3-2",
        title: "Badminton Jump Smash Timing",
        titleThai: "จังหวะกระโดดตบและความสูงจุดปะทะกลางอากาศ",
        duration: "18 mins",
        difficulty: "Advanced",
        description: "เคล็ดลับการคำนวณไทมิ่งแรงกระโดดถีบตัวระเบิดพลังกลางเวหา เพื่อจับมุมจุดกระทบลูกสูงปะทะทำมุมลาดชัดฉีกแนวรับศัตรู",
        descriptionThai: "การประสานพลังแกลลอปฟุตเวิร์ครวมศูนย์เข้าสู่ลูกกระโดดตบ",
        youtubeId: "EIA_zmsVf8A",
        points: 200,
        steps: [
          { title: "ขั้นตอนที่ 1: Split-Step Explosive Push", details: "กดขอบสะโพกต่ำแล้วใช้แรงข้อม้าสลัดถีบตัวถลันลอยสูงขึ้นแนวดิ่งฉับพลัน" },
          { title: "ขั้นตอนที่ 2: Backarch & Arm Cocking", details: "นิ่งเกร็งแอ่นแผ่นหลังรักษาสมดุลกลางอากาศ จัดท่าจับด้ามกระชับรับองศาเตรียมสับ" },
          { title: "ขั้นตอนที่ 3: Steep Snap & Soft Landing", details: "สะบัดทุบตีตัดองศากดลงจุดหน้าหัวตัว พร้อมลงสัมผัสด้วยอุ้งเท้าซ้ายขวาอย่างสมดุลถนอมเข่า" },
        ],
      },
    ],
    quiz: [
      {
        id: "qz-3-1",
        question: "ข้อใดคือการทำงานของสายโซ่จลนศาสตร์ (Kinetic Chain) ที่ถูกต้องในการกระตุ้นแรงตบสูงสุด?",
        options: [
          "ใช้แรงแผ่ออกจากข้อมืออย่างเดียวโดยไม่ต้องอาศัยสะโพกบิด",
          "ถ่ายพลังสปริงตัวจาก ขา -> บิดสะโพก -> การส่งหัวไหล่ -> คว่ำข้อศอกและท่อนแขน (Pronation)",
          "กระโดดตบโดยห้ามใช้กล้ามเนื้อท้องเกร็งตัว",
          "ต้องเกร็งกล้ามเนื้อหงายหน้ามือหั่นแนวราบตีออกด้านบนคอร์ส",
        ],
        correctIndex: 1,
        explanation: "การส่งต่อแรงสืบเนื่องจากกล้ามเนื้อมัดใหญ่ของท่อนขาและสะโพกไล่ลำดับส่งต่อมายังไหล่ แขน และลงไปสะบัดสแนปหน้าไม้จังหวะสุดท้ายเพิ่มความเร็วลูกตบแบบยกกำลังสอง",
      },
      {
        id: "qz-3-2",
        question: "เทคนิค 'Forearm Pronation' ในการลุยตบหมายความว่ากิจกรรมทำมุมแขนแบบใด?",
        options: [
          "การยกข้อศอกดัดคงรูปแล้วบิดหลังมือเข้าสู่แดนเตะข้างหลัง",
          "การปลดบิดคลายกระดูกแขนด้านล่างสะบัดสแนปหน้าไม้เพื่อบิดคว่ำหน้าเหลี่ยมกดลงอย่างเร็วแรง",
          "การแกว่งไหล่ออกด้านข้างค้างแขนเรียบ",
          "การกดงอกระดูกข้อมือเกร็งส้นทื่อๆ กวัดแกว่งแนวราบ",
        ],
        correctIndex: 1,
        explanation: "Pronation คือการบิดสะบัดแขนท่อนนอกเข้าด้านใน ช่วยเปลี่ยนระนาบหมุนส่งหน้าไม้ให้พุ่งสะเทือนอย่างรุนแรง ตะบันลงคอร์ทเกร็งแรงสแนปอย่างถูกสรีรวิทยาป้องกันเอ็นอักเสบ",
      },
      {
        id: "qz-3-3",
        question: "วัตถุประสงค์ตามหลักยุทธศาสตร์หลักของผู้เล่นในการเลือกใช้วิธี 'Jump Smash' แทนการยืนตบตรงทั่วไปคือข้อใด?",
        options: [
          "เพื่อเลียนแบบความงดงามทวงท่่าถ่ายรูปแบบสัญญะ",
          "เพื่อแย่งจังหวะตีความสูงรวดเร็วกว่า และบวกกับพาวเวอร์แรงเหวี่ยงตัวกลางอากาศเร่งแรงดิ่งชันเฉียงจุดตกที่เฉียบขาด",
          "เพื่อหลบการเกร็งกล้ามเนื้อสะโพก",
          "ทำให้ลูกมีรอบดีดกลับไปเด้งกำแพงสนามอัตโนมัติ",
        ],
        correctIndex: 1,
        explanation: "กระโดดตบช่วยยกระดับความสูงในการปะทะ ทำให้สามารถทุบสแมชมุมที่ลาดชันขึ้น บีบให้แนวป้องกันรับของคู่ต่อสู้โดนโจมตีที่กดบีบจี้ตัวตอบรับยากที่สุด",
      },
      {
        id: "qz-3-4",
        question: "พิกัดปะทะทิศทางของลูกขนไก่ที่ถูกต้องลื่นไหลที่สุด ณ ขณะตีตบ Smash คือขนาบบริเวณใด?",
        options: [
          "ตีหลังพิกัดกระหม่อมศีรษะขณะลำตัวแอ่นหงายสุดฤทธิ์",
          "ตีหน้าพิกัดหน้าผาก/ไหล่ ระดับค่อนไปทางด้านหน้าลำตัวเยื้องเฉียงประมาณครึ่งฟุตเพื่อกดไหล่ส่ง",
          "ระนาบคราบหูซ้ายล่างขนานข้อศอก",
          "ด้านข้างเฉียงกระเดียดเอวซ้ายขวาด้านหลัง",
        ],
        correctIndex: 1,
        explanation: "การปะทะลูกข้างหน้าตัวเล็กน้อยจะช่วยให้มุมส่งแรงจากวงคว่ำไหล่ ข้อศอก และพาวเวอร์ลำตัวสะสมระเบิดออกหน้าไม้เข้าหาลูกสะท้อนได้อย่างเบ็ดเสร็จมีน้ำหนัก",
      },
    ],
  },
  {
    id: "mod-4",
    title: "4. ทักษะหยอดปั่นหน้าเน็ตและการรับลูกตบ (Tight Spin Net Shots & Defense)",
    titleThai: "การหยอดม้วนหน้าเน็ตเลียดขอบและรูปแบบตั้งรับสกัดแรงตบสแมชอย่างแม่นยำ",
    lessons: [
      {
        id: "les-4-1",
        title: "Tight Rolling Spin Net Shot",
        titleThai: "เทคนิคการหยอดปั่นสปินม้วนเลียดสะกิดเน็ต",
        duration: "14 mins",
        difficulty: "Intermediate",
        description: "ส่องความลับของการเอียงสัมผัสลากหัวลูกขนไก่เบาๆ แบบสะบัดข้อมือแบรนด์ เพื่อสร้างรอบสปินเกลียวม้วนเลียดเส้นเน็ตข้ามยาก",
        descriptionThai: "อาวุธหน้าตาข่ายที่คู่แข่งรับได้ยากที่สุดเพราะหน้าคอร์กสั่นคลอนแวบวาบ",
        youtubeId: "8Yk6BvE_X88",
        points: 150,
        steps: [
          { title: "ขั้นตอนที่ 1: Deep Net Approach", details: "สไลด์เข้าใต้จุดวิถีขนไก่ชิดขอบตาข่าย โดยหน้าไม้ขนานแนวด้านราบ" },
          { title: "ขั้นตอนที่ 2: Lateral Brush Cushion", details: "ปาดช้อนหันเอียงหน้าไม้ปาดลากผิวด้านข้างใต้หัวคอร์กขนไก่เบาๆ เหมือนทาสีกวาด" },
          { title: "ขั้นตอนที่ 3: Complete Loose Release", details: "ปล่อยผ่อนความเหนียวของมือจับ ให้ลูกส่ายม้วนตีเกลียวพับหุบข้ามไปเบาๆ" },
        ],
      },
      {
        id: "les-4-2",
        title: "Smash Defense Masterclass",
        titleThai: "เทคนิคบล็อกรองรับสกัดพลังตบ",
        duration: "16 mins",
        difficulty: "Intermediate",
        description: "หลักสูตรเคล็ดรู้วิธีคลายแรงควงข้อมือเพื่อตั้งรับลูกสแมชกระแทกส่ง พร้อมผ่อนถ่ายน้ำหนักสัมผัสเด้งกลับหยอดหน้าเน็ตเพื่อเปลี่ยนเกมรุก",
        descriptionThai: "เปลี่ยนพลังรุกความไวสูงให้หมดพิษสงกลายเป็นลูกหยอดรุกคืนเบา",
        youtubeId: "pXl8Tsz96Xw",
        points: 150,
        steps: [
          { title: "ขั้นตอนที่ 1: Low Stance Ready", details: "ย่อเข่าเกร็งสะโพกเตี้ยต่ำ ถือแร็กเก็ตระดับแผงอกด้านหน้างอนิ้วเล็กน้อยดักคอย" },
          { title: "ขั้นตอนที่ 2: Loose Wrist Deflection", details: "วินาทีปะทะลูกตบ คลายข้อมือผ่อนกลับถอยเล็กน้อย (Absorption) ซับแรงฟาด" },
          { title: "ขั้นตอนที่ 3: Touch Angle Placement", details: "กำหนดมุมกดซ้ายขวาเพื่อส่งลูกกลับไปตกรอบข้างเน็ตที่ไร้ผู้ยืนคุ้มกัน" },
        ],
      },
    ],
    quiz: [
      {
        id: "qz-4-1",
        question: "หลักการทำปฏิกิริยากระทบไม้แบบใดสร้างรอบสปินเกลียวนอนเลียดหน้าเน็ตในเคล็ดวิชา 'Spinning Net Shot'?",
        options: [
          "ทุบกวาดเต็มหน้าเหล็กดันทะลึ่งไปข้างบนตรงดิ่ง",
          "หงายเอียงหน้าไม้ปาดเฉือนรอบวงกลมข้างใต้หัวคอร์กลำตัวลูก เพื่อสลัดส่งวิถีรอบม้วนเหวี่ยง",
          "ดันเฉียงหน้างัดปลายสะโบกสแมชดิ่งปัก",
          "ทื่อถอยหลบไม่กล้าสัมผัสกระโดปักโหม",
        ],
        correctIndex: 1,
        explanation: "การเฉือนปาดกวาดเบาๆ (Brushing/Slicing touch) ใต้แคนดี้ลูกขนไก่ขณะสัมผัส จะทำให้หัวลูกเกิดแรงสปินควงเกลียวข้ามเน็ตแบบขาดสมดุล ซึ่งประเวศจังหวะปัดให้ขัดขวางการตะครุบรุนแรง",
      },
      {
        id: "qz-4-2",
        question: "เมื่อคู่เล่นแอบปาดลูกสปินต่ำเฉี่ยวเส้นเน็ตมาตกฝั่งเรา ยุทธศาสตร์รุกรวดเร็วคือเรื่องใด?",
        options: [
          "ปล่อยตกรอจับรอบสองหลังกระดอน",
          "รุกสไลปเข้าคว้าระดับความสูง (High Point Support) สูงเหนือน้ำหนักคัดและสไลสปินบล็อกสวนฉับพลัน",
          "เขยิบวิ่งอ้อมไปหลังคอร์ทเพื่อโอบกอดรับลูกหลังมือ",
          "โยนแร็กเก็ตลอยข้ามเขตเน็ตหวังชนลูกให้พุ่งเอง",
        ],
        correctIndex: 1,
        explanation: "การเข้าถึงจุดตีกระทบระดับสูงสุดเหนือตาข่าย (High Contact Point) บังคับสยบคู่แข่งทันทีเพื่อเล่นเกมรุกตัดชอยส์หน้าเน็ตให้เราไม่ปะทะเสียแต้ม",
      },
      {
        id: "qz-4-3",
        question: "วิธีการควบคุมมุมและแรงสะพัดข้อมือขณะถือรับตั้งสกัดกั้นบล็อกลูกตบกึ่งกลาง (Soft Defense Block)?",
        options: [
          "เหวี่ยงกระแทกไม้ฟาดกลับสุดกำลังต้นแขนแบบเต็มหน้าตบ",
          "ถือหน้าไม้ค้างทรงมั่นคง คลายบีบนิ้วผ่อนแรงเล็กน้อยซับพอร์ตแรงกระแทก (Absorb) ย้อยเบาเหนือเน็ต",
          "พับแร็กเก็ตปล่อยให้ทุบโดนแขนพยุงไหล่",
          "สะบัดแว้งพัดขึ้นฟ้าโด่งร่อนกลางใบคอร์ท",
        ],
        correctIndex: 1,
        explanation: "การผ่อนข้อหรือซับแรง (Absorption) โดยถือสมาธิจับข้อมือผ่อนตามแรงเบาๆ จะช่วยซับความเร็วลูกกระแทกลงได้อย่างดี ม้วนตกลงเป็นหยอดหน้าคอร์ทอีกปีกได้อย่างสมบูรณ์",
      },
      {
        id: "qz-4-4",
        question: "ท่าย่อย่อตัวและจุดศูนย์ถ่วงแผงรับการตบอย่างถูกต้องตามแผนลากรับบุกของแชมป์เปี้ยน?",
        options: [
          "ยืนเข่าเหยียดตึงแนบขาชิดหน้าตัวหงายใบไหล่เปราะร้าว",
          "แยกกางแนวส้นเท้าเข่ากว้างกว่าปกติตัวย่อสะโพกเตี้ยต่ำ เอียงแผงอกมาหน้ารับระดับแร็กเก็ตระดับสายตา",
          "เอนตัวนอนห้อยก้นพิงผนังตาขาย",
          "เหน็บหนีบมือชิดลอยระดับพิกัดหลังเอวเฉียง",
        ],
        correctIndex: 1,
        explanation: "การลดจุดศูนย์ถ่วง (Low Center of Gravity) และการขยายระยะเท้าบีบให้ปฏิกิริยาเซฟข้อศอกและท่อนแขนด้านล่างขยับรับสกัดได้กว้างรวดเร็วและนิ่งขึ้น",
      },
    ],
  },
  {
    id: "mod-5",
    title: "5. การเคลื่อนที่และการยืนคู่อย่างอัจฉริยะ (Doubles Strategy & Rotation)",
    titleThai: "แทกติกตำแหน่งยืนคู่ทีมและหลักกลยุทธ์หมุนเวียนสลับเปลี่ยนคลุมคอร์ทลื่นไหล",
    lessons: [
      {
        id: "les-5-1",
        title: "Doubles Attacking & Defensive Formations",
        titleThai: "รูปแบบแกนบุกแนวราบและตั้งรับคู่ทีมหน้า-หลัง/ซ้าย-ขวา",
        duration: "15 mins",
        difficulty: "Advanced",
        description: "เรียนรู้แนวคิดหลักทางยุทธศาสตร์ของการประกบยืนคู่ วิธีสลับแผนขึ้นหน้าหลังคู่เพื่อถล่มบุก และสับยืนขนานข้างซ้ายขวาเพื่อคุ้มกันการตบเฉือน",
        descriptionThai: "การสื่อสารสายตาผ่านแผนภาพพื้นที่และการหมุนเวียนคุ้มคอร์ทไร้รอยต่อ",
        youtubeId: "_U9_LPhqlyU",
        points: 200,
        steps: [
          { title: "ขั้นตอนที่ 1: Mid-court Intercept Guard", details: "เมื่อลูกอยู่วิถีบุกคอร์ส ให้ผู้เล่นแดนหน้าเข้ายืนตัดกลางข่มคู่วิถีคราดฝั่งตรงข้าม" },
          { title: "ขั้นตอนที่ 2: Front-Back Attack Shape", details: "ผู้เล่นคนหลังตบกระจายแรง ผู้เล่นแดนหน้าถือแร็กเก็ตลอยสูงเก็บลูกตอบรับยอดเน็ต" },
          { title: "ขั้นตอนที่ 3: Side-by-Side Secure Wall", details: "เมื่อต้องเปลี่ยนเป็นฝ่ายรับ โอนกลับสับยืนแนวดินเหนียวซ้ายขวายางพาราช่วยกันอุ้มคอร์ทกว้าง" },
        ],
      },
      {
        id: "les-5-2",
        title: "Speed Rotation Tactics & Intercepts",
        titleThai: "กลยุทธ์การหมุนตำแหน่งไดนามิกว่องไวและการอ่านสกัดลูกพุชไดรฟ์",
        duration: "16 mins",
        difficulty: "Advanced",
        description: "เคล็ดวิธีการขยับถอยสวิงหมุน (Rotation Clockwise Style) ของคู่หูกีฬาแบดมินตันเพื่อประดิษฐ์สเปซ ป้องกันเหตุการณ์ชนแร็กเก็ตคาใบหูหรือเหยียบข้อเท้าพวกเดียวกัน",
        descriptionThai: "ระบบเคลื่อนที่กวนสมดุลสนามด้วยประสาทการไหลลื่นไหล",
        youtubeId: "Z90-Bv7_2i8",
        points: 200,
        steps: [
          { title: "ขั้นตอนที่ 1: Baseline Drop Intercept Trigger", details: "เมื่อเพื่อนร่วมทีมหลังพ่นงัดตัดเฉือนสลัด (Drop) รีบพุ่งหน้าประกบแดนซ้ายขวาค้ำ" },
          { title: "ขั้นตอนที่ 2: Backhand Cover Swapping", details: "หมุนสลัดทางทวนเข็มตามแกนแนวระนาบเพื่อหมุนสลับจุดคลุมคอร์ทอัตโนมัติ" },
          { title: "ขั้นตอนที่ 3: Racquet Rise Command", details: "ยกไหล่ไม้ตั้งตรงสูงระดับเหนือตาข่ายเป็นกริชสกัดลูกพุ่งตัดไดรฟ์ตรงกลางสนาม" },
        ],
      },
    ],
    quiz: [
      {
        id: "qz-5-1",
        question: "ในการแข่งขันปะทะทีมคู่ แผนภาพการยืนพื้นที่ประเภทใดใช้สำหรับจุดประสงค์เพื่อ 'เล่นเกมรุกกดดัน (Attack Form)' และ 'คัดตั้งรับการต้านทาน (Defend Form)' ลำดับหลัก?",
        options: [
          "บุกบีบยืน แนวนอนประกบซ้ายขวากลวงเน็ต / รับบีบยืน แนวชิดมุมเฉลียง",
          "บุกประกบยืนวิถีหน้าหน้าหลัง (Front-and-Back) / รับเปลี่ยนสลับขยับขวางระนาบซ้ายขวาประกบตาราว (Side-by-Side)",
          "ไม่มีแผนกำหนดให้วิ่งชนกันแบบมั่วกระจัดกระจาย",
          "ยืนรวมสองคู่กระโดดปักที่ขอบแนวรั้วคนละด้านหลังเส้นจำกัดคอร์ท",
        ],
        correctIndex: 1,
        explanation: "ยืนหน้า-หลังทำหน้าที่ส่งเสริมบอมบ์ตบตระหง่านและคามแย่งตีตะครุบหน้าจอ (Offense) ส่วนยืนซ้าย-ขวาขัดขวางแรงตบนอนเลียดปกป้องอาณาเขตทางราบเกลี้ยงคอร์ท (Defense)",
      },
      {
        id: "qz-5-2",
        question: "เมื่อคู่เล่นแร็ตหน้าสุดแดนหน้างัดลูกขึ้นสูงโด่งสะกดหลังเน็ตไปคอร์สคู่อริ ตัวผู้เล่นแดนหลังคู่ทีมควรถือสแตนด์ปรับแผนอย่างไรเพื่อสกัดกั้น?",
        options: [
          "ถอยก้าวปรีสเต็ปมาเกลือกยืนคราบหลังพิงเส้นเดี่ยวตลึงนิ่ง",
          "รีบสลับทิศทางหมุนคลุมมาขยับยืนปีกด้านซ้ายขวาประกบเพื่อนร่วมสยบรับแนวตั้ง (Side-by-Side Defense)",
          "ถลันวิ่งพุ่งซ้ายขวาหน้าชิดเน็ตด้วยกันแย่งตำแหน่งหน้ากวาดหยอด",
          "สติขาดลอยโยนไม้หลบหนีออกจากพื้นที่สตรีมเมอร์",
        ],
        correctIndex: 1,
        explanation: "เมื่อเราตัดงัดยาวเซฟโด่งจำต้องโอนแผนมาตั้งกำแพงรับสแมชคู่แข่งทันที การประกบซ้าย-ขวาคือการกระจายคนละครึ่งแนวกว้างเพื่อปกป้องเส้นขอบตบขนานสนาม",
      },
      {
        id: "qz-5-3",
        question: "ลูกลอบไดรฟ์เรียดเส้นกลาง (Flat Mid-court Drive) ในการต่อสู้คู่ผสม วิธีรับหักเหลี่ยมที่มีความสำคัญที่สุดของผบ.เน็ตแดนหน้าสุด?",
        options: [
          "กดหัวไม้ชี้ดินดักรองแถวหน้าขาขวา",
          "ชูหัวไม้แร็กเก็ตลอยโด่งประจบระดับแนวสะสะตึงเหนือเฉิดตาข่าย (Active Racquet) ดักบล็อกโอบกวัดลูกกลางวิถีทันที",
          "ปล่อยให้ความเร็วลูกผ่านแกนหูถอยลึกให้เพื่อนทุบรับรอบหลัง",
          "หันวิ่งหันหลังจากตาข่ายหันไปเชียร์คู่หลังปะทะ",
        ],
        correctIndex: 1,
        explanation: "การยกแร็กเก็ตสูงคาไว้หน้าแดนทีมคู่ (Active Court Racquet Setup) ยอดขั้วสายตา ช่วยแย่งเวลาการสกัดทุบสะท้อนแตะปาดลูกที่คู่เล่นเด้งตอบข้ามเส้นตาข่ายพุ่งทลายได้อย่างรวดเร็วหวังคะแนนทันที",
      },
      {
        id: "qz-5-4",
        question: "ทำวิธีสไตล์แบบใดช่วยหลีกเลี่ยงเหตุการณ์ชนปะทะไม้แร็กเก็ตหรือกระโดดเหยียบหลังเหยียบขาเพื่อนร่วมสนาม (Partner Clashing)?",
        options: [
          "ตั้งวิสัยกติกาว่าจะสลับวิ่งตามความพึงพอใจว่าใครส่งเสียงได้ร้องดังกว่า",
          "การเข้าใจการหมุนตำแหน่งระบบโรเทชั่นเชิงวงกลม (Dynamic Circular Rotation) และกติกาประสานสายตาอ่านทิศตัวแทนลูกที่ปะทะ",
          "ให้จัดยืนคนหนึ่งนั่งเกร็งแถวขอบประตูปัดคอยเชียร์",
          "หมุนไม้ทวนเข็มวิหาร 3 รอบพร้อมคลานสวมเข่ากอดเพื่อนคู่คอร์ท",
        ],
        correctIndex: 1,
        explanation: "การหมุนเวียนแบบไหลไดนามิกลื่นไหลประสานสายตา (เช่น ดรอปแล้วเข้าประกบเน็ตเพื่อสับขยับเพื่อนเวียนคัดคุมสนามหลัง) เคลียร์ช่องความว่าง ปลุกศักยภาพความเร็วนักสู้อภิมหาแชมป์",
      },
    ],
  },
];

export default function OnlineAcademy({ user, onChangeUser }: OnlineAcademyProps) {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [playerViewMode, setPlayerViewMode] = useState<"video" | "simulation">("video");
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [useYouTube, setUseYouTube] = useState(true);
  const [customYoutubeLinkInput, setCustomYoutubeLinkInput] = useState("");
  const [customYoutubeIds, setCustomYoutubeIds] = useState<{ [lessonId: string]: string }>({});

  const parseYoutubeId = (url: string) => {
    if (!url) return "";
    // supports youtu.be/ID, watch?v=ID, embed/ID or raw ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url.trim();
  };

  const currentModule = ACADEMY_CURRICULUM[activeModuleIndex];
  const currentLesson = currentModule.lessons[activeLessonIndex] || currentModule.lessons[0];
  const currentVideoId = customYoutubeIds[currentLesson.id] || currentLesson.youtubeId;

  const [customLinkError, setCustomLinkError] = useState<string | null>(null);

  const handleApplyCustomLink = () => {
    const videoId = parseYoutubeId(customYoutubeLinkInput);
    if (videoId && videoId.length === 11) {
      setCustomYoutubeIds((prev) => ({
        ...prev,
        [currentLesson.id]: videoId,
      }));
      setCustomYoutubeLinkInput("");
      setCustomLinkError(null);
    } else {
      setCustomLinkError("⚠️ ลิงก์ไม่ถูกต้อง รหัส YouTube ต้องมีความยาว 11 อักขระครับ");
    }
  };

  // Calculate if qualified for certificate
  const isModuleQuizPassed = (modId: string) => {
    return user.completedQuizzes.includes(modId);
  };

  const isAllModulesPassed = ACADEMY_CURRICULUM.every((mod) =>
    user.completedQuizzes.includes(mod.id)
  );

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    // Validate all answered
    const unanswered = currentModule.quiz.some((q) => quizAnswers[q.id] === undefined);
    if (unanswered) {
      setQuizError("⚠️ กรุณาตอบคำถามให้ครบทุกข้อก่อนการส่งคำตอบครับ");
      return;
    }
    setQuizError(null);

    // Compute score
    let correctCount = 0;
    currentModule.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const is100Percent = correctCount === currentModule.quiz.length;
    setQuizScore(correctCount);
    setQuizSubmitted(true);

    if (is100Percent) {
      // Mark as completed module
      if (!user.completedQuizzes.includes(currentModule.id)) {
        onChangeUser({
          ...user,
          completedQuizzes: [...user.completedQuizzes, currentModule.id],
        });
      }
    }
  };

  const handleResetQuiz = () => {
    setQuizSubmitted(false);
    setQuizAnswers({});
    setQuizScore(null);
    setQuizError(null);
  };

  // PROGRAM-LEVEL CANVAS CERTIFICATE COMPILER
  const generateAndDownloadCertificateImage = (e: React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Redraw on canvas to make sure we render fresh details
    // Canvas dimensions: 1200 x 850 (High Definition aspect)
    canvas.width = 1200;
    canvas.height = 850;

    // 1. Solid Off-White Parchment Background
    ctx.fillStyle = "#FDFBF7";
    ctx.fillRect(0, 0, 1200, 850);

    // 2. Forest Emerald Border Framework
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#064E3B"; // emerald-950
    ctx.strokeRect(20, 20, 1160, 810);

    // Dynamic Golden Corner Accents
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#D97706"; // amber-600
    ctx.strokeRect(35, 35, 1130, 780);

    // Drawing ornamental corners
    ctx.fillStyle = "#D97706";
    // Top-Left corner
    ctx.fillRect(35, 35, 40, 40);
    // Top-Right corner
    ctx.fillRect(1125, 35, 40, 40);
    // Bottom-Left corner
    ctx.fillRect(35, 775, 40, 40);
    // Bottom-Right corner
    ctx.fillRect(1125, 775, 40, 40);

    // 3. Header Texts
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#064E3B";
    ctx.font = "bold 24px 'Space Grotesk', 'Inter', sans-serif";
    ctx.fillText("PRN BADMINTON ARENA & ONLINE ACADEMY", 600, 100);

    ctx.fillStyle = "#D97706";
    ctx.font = "bold 56px 'Space Grotesk', 'Inter', sans-serif";
    ctx.fillText("CERTIFICATE OF EXCELLENCE", 600, 175);

    ctx.fillStyle = "#6B7280"; // gray-500
    ctx.font = "italic 18px 'Inter', sans-serif";
    ctx.fillText("เกียรติบัตรรับรองความรู้ทางทักษะกีฬาแบดมินตัน", 600, 235);

    // 4. Recipient details
    ctx.fillStyle = "#374151"; // gray-700
    ctx.font = "medium 20px 'Inter', sans-serif";
    ctx.fillText("เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า (This is to certify that)", 600, 310);

    // Heavy Royal name rendering
    ctx.fillStyle = "#064E3B";
    ctx.font = "bold 44px 'Space Grotesk', 'Inter', sans-serif";
    ctx.fillText(user.name, 600, 390);

    // Underline name decoration
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#D97706";
    ctx.beginPath();
    ctx.moveTo(350, 420);
    ctx.lineTo(850, 420);
    ctx.stroke();

    // Course completion description
    ctx.fillStyle = "#374151";
    ctx.font = "18px 'Inter', sans-serif";
    ctx.fillText("ได้ผ่านการเรียน อบรม และทดสอบความเชี่ยวชาญทักษะเฉพาะด้านตามหลักสูตรรวม", 600, 475);

    ctx.fillStyle = "#064E3B";
    ctx.font = "bold 22px 'Space Grotesk', 'Inter', sans-serif";
    ctx.fillText("BADMINTON PRO MASTERCLASS (ทักษะจับไม้ ฟุตเวิร์ค ลูกหยอด ลูกตบ ลูกปั่นหน้าเน็ต และแทคติกคู่)", 600, 520);

    ctx.fillStyle = "#6B7280";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.fillText("ขอจดจำความเป็นผู้รู้ มีความตั้งใจ มุ่งมั่นฝึกฝนพัฒนาประสิทธิภาพความเป็นเลิศตลอดไป", 600, 565);

    // 5. Verification Block (Footer row)
    // Left Signer
    ctx.fillStyle = "#111827";
    ctx.font = "bold 18px 'Inter', sans-serif";
    ctx.fillText("PRN Badminton Center", 280, 680);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("ผู้ควบคุมการสอนและจัดฝึกคิว", 280, 710);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#D1D5DB";
    ctx.beginPath();
    ctx.moveTo(150, 660);
    ctx.lineTo(410, 660);
    ctx.stroke();

    // Center Golden stamp vector placeholder circle
    ctx.beginPath();
    ctx.arc(600, 680, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "#F59E0B";
    ctx.fill();
    ctx.strokeStyle = "#D97706";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 13px 'Space Grotesk', sans-serif";
    ctx.fillText("VERIFIED", 600, 672);
    ctx.font = "bold 11px 'Space Grotesk', sans-serif";
    ctx.fillText("★ PRN ★", 600, 692);

    // Right Signer
    ctx.fillStyle = "#111827";
    ctx.font = "bold 18px 'Inter', sans-serif";
    ctx.fillText("สถาบันอบรมแบดมินตันออนไลน์", 920, 680);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("ผู้อำนวยการฝ่ายการท่องเที่ยวและกีฬา", 920, 710);
    ctx.beginPath();
    ctx.moveTo(790, 660);
    ctx.lineTo(1050, 660);
    ctx.stroke();

    // Custom security certificate numbers in margin
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "font-mono 12px 'Inter', sans-serif";
    ctx.fillText(`Verification Code ID: PRN-${user.memberId}-${new Date().getFullYear()}`, 600, 770);

    // Trigger instant browser download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Certificate-${user.name.replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COMPONENT: Sidebar curriculum module trees */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <h3 className="text-lg font-display font-bold text-indigo-955 flex items-center gap-2 mb-1">
          <BookOpen className="text-indigo-900 w-5 h-5" />
          บทเรียนและหลักสูตรแบด (600 EXP)
        </h3>

        <div className="flex flex-col gap-2.5">
          {ACADEMY_CURRICULUM.map((mod, index) => {
            const isActive = activeModuleIndex === index;
            const isPassed = isModuleQuizPassed(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setActiveModuleIndex(index);
                  setActiveLessonIndex(0);
                  handleResetQuiz();
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isActive
                    ? "bg-indigo-950 border-indigo-950 text-white shadow-md relative"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isActive ? "bg-lime-400 text-indigo-955" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isPassed ? "🏆 ผ่านแล้ว" : "📖 ในการสอน"}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">+{mod.lessons.length * 100} EXP</span>
                </div>

                <h4 className={`text-sm font-bold tracking-wide whitespace-normal mt-2 ${
                  isActive ? "text-lime-350" : "text-slate-850"
                }`}>
                  {mod.title}
                </h4>
                <p className={`text-xs mt-1 truncate ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                  {mod.titleThai}
                </p>

                <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-slate-200/10 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-semibold">
                    <Play className="w-3.5 h-3.5 text-lime-400" />
                    {mod.lessons.length} บทเรียนย่อย
                  </span>
                  <span>•</span>
                  <span>ควิซท้ายบท 1 ชุด</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Portal status bar */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-955 text-white p-5 rounded-2xl shadow-md border border-indigo-900 mt-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
          <div className="relative">
            <h4 className="text-xs text-lime-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-lime-400" />
              ใบรับรองจบหลักสูตร (Certificate)
            </h4>
            <p className="text-xs text-slate-300/90 leading-relaxed mb-4 font-sans">
              เรียนครบและสอบควิซผ่าน 100% ครบทุก {ACADEMY_CURRICULUM.length} ยูนิตเดี่ยวเพื่อออกสัมปทานบัตรเกียรติบัตรรับรองวิทยฐานะโค้ชชิ่งของคุณทันที!
            </p>

            <div className="flex items-center justify-between bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 mb-4 text-xs font-mono">
              <span>สถานะของคุณ:</span>
              <strong className={isAllModulesPassed ? "text-lime-400" : "text-amber-300 font-bold"}>
                {isAllModulesPassed ? "🎯 พร้อมรับเกียรติบัตร" : `${user.completedQuizzes.length} / ${ACADEMY_CURRICULUM.length} ผ่านแล้ว`}
              </strong>
            </div>

            {isAllModulesPassed ? (
              <button
                id="btn-trigger-cert"
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full bg-lime-400 hover:bg-lime-500 text-indigo-955 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-lg shadow-lime-400/20 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                รับเกียรติบัตรของคุณที่นี่ (Get Certificate)
              </button>
            ) : (
              <div className="w-full text-center bg-white/5 border border-white/5 text-slate-400 font-medium py-2 rounded-xl text-xs flex items-center justify-center gap-1">
                🔓 ต้องผ่านควิซก่อนเพื่อปลดล็อกเกียรติบัตร
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COMPONENT: Active study guide / simulated video player & quiz screen */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Dynamic Study Header tab switch (Lesson vs Practice Quiz) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div>
              <span className="text-[10px] bg-indigo-55 text-indigo-900 border border-indigo-200 font-bold px-2 py-0.5 rounded font-mono">
                {currentLesson.difficulty.toUpperCase()} MODULE
              </span>
              <h2 className="text-lg font-display font-bold text-slate-800 mt-1">
                {currentLesson.titleThai}
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 font-mono">
              บทเรียนที่ {activeLessonIndex + 1} จาก {currentModule.lessons.length}
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-6">{currentLesson.description}</p>

          {/* NEW TABBED PLAYER VIEW: YouTube Video vs Tactical Board */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-4 gap-2">
            <button
              id="player-tab-video"
              onClick={() => setPlayerViewMode("video")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                playerViewMode === "video"
                  ? "bg-indigo-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">📺</span> วิดีโอสอนจริงจาก YouTube
            </button>
            <button
              id="player-tab-sim"
              onClick={() => setPlayerViewMode("simulation")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                playerViewMode === "simulation"
                  ? "bg-indigo-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">🎨</span> กระดานสเต็ปโมชันแทคติกจำลอง
            </button>
          </div>

          {/* PLAYER GRID CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-4">
            {/* The outer container has clean aspect-video scaling and no flex layout to prevent grid overlapping bugs */}
            <div className="md:col-span-8 w-full aspect-video bg-slate-950 rounded-2xl relative overflow-hidden border border-slate-200 shadow-sm">
              {playerViewMode === "video" && currentVideoId ? (
                <iframe
                  id={`youtube-iframe-${currentVideoId}`}
                  src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&autoplay=0`}
                  title={currentLesson.titleThai}
                  className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                  {/* Fake player container */}
                  <div className="absolute inset-0 bg-radial-gradient(circle_at_center, rgba(163,230,53,0.08), transparent_70%)" />
                  
                  {/* Simulated court baseline grid lines */}
                  <div className="absolute inset-x-0 bottom-1/4 h-0.5 bg-white/10" />
                  <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-white/10 border-dashed" />
                  <div className="absolute w-0.5 h-full top-0 left-1/2 bg-white/5" />

                  {/* Court graphics showing real hits */}
                  <div className="relative z-10 p-4 text-center max-w-sm">
                    <div className="w-16 h-16 bg-indigo-900/40 border border-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                      <Play className="text-lime-400 w-7 h-7 fill-lime-400 pl-0.5" />
                    </div>
                    <h5 className="text-xs font-semibold tracking-wider text-slate-200">วิดีโออนิเมชันสาธิตจลศาสตร์ข้อเหวี่ยง</h5>
                    <p className="text-[10px] text-slate-400 mt-1">
                      การเคลื่อนไหวสโลว์โมชันวิธีกดข้อมือสะบัดลวงตา คุมด้วยทักษะ {currentLesson.title}
                    </p>
                  </div>

                  {/* Status bar */}
                  <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur border border-white/5 px-3 py-1.5 rounded-lg flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Volume2 className="w-3.5 h-3.5 text-lime-400 animate-pulse" /> AUTO VOICE COACHING: ACTIVE
                    </span>
                    <span className="text-lime-400 font-bold font-mono">1080P AUDIO PRO</span>
                  </div>
                </div>
              )}
            </div>

            {/* Drill execution steps card next to video */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm min-h-full">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  ขั้นตอนทดสอบการฝึกซ้อม (Drills)
                </h4>
                <div className="space-y-3.5">
                  {currentLesson.steps.map((st, sidx) => (
                    <div key={sidx} className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-900 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {sidx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">{st.title}</span>
                        <span className="text-[10px] text-slate-400 block leading-normal mt-0.5">{st.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 mt-4 text-center">
                <span className="inline-block text-[10px] font-bold text-lime-900 bg-lime-100/60 border border-lime-305 px-2 py-0.5 rounded">
                  💡 ฝึกหน้าเสาหรือผนังคอร์ทวันละ 15 นาที
                </span>
              </div>
            </div>
          </div>

          {/* Interactive YouTube Link Override Customizer / Fixer */}
          <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-xl mb-4 text-xs shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <label className="font-bold text-indigo-950 flex items-center gap-1">
                ⚙️ วิดีโอเล่นไม่ได้ หรือ ต้องการสลับวิดีโอ?
              </label>
              <span className="text-[10px] text-slate-400 font-mono">ID ปัจจุบัน: {currentVideoId}</span>
            </div>
            <p className="text-[11.5px] text-slate-500 mb-2 leading-relaxed">
              หากเจอปัญหาวิดีโอล็อคภูมิภาค ลบออก หรือไม่ซิงค์ สามารถวางลิงก์วิดีโอ YouTube ของบทสอนนี้ที่ท่าชอบได้เลยทันที (เช่น https://youtu.be/... หรือ watch?v=...) ระบบของเราจะทำการสับเปลี่ยนให้คอร์ทเล่นสดใหม่ตลอดกาล:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="วางลิงก์ YouTube หรือพิมพ์รหัสรหัสผ่านวิดีโอ 11 หลัก เช่น sS6A9Kj54K0..."
                value={customYoutubeLinkInput}
                onChange={(e) => setCustomYoutubeLinkInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-550 text-xs"
              />
              <button
                onClick={handleApplyCustomLink}
                className="bg-indigo-900 text-white font-bold px-4 py-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer text-xs shrink-0"
              >
                ปรับเปลี่ยน
              </button>
            </div>
            {customLinkError && <p className="text-[10px] text-red-500 font-semibold mt-1.5">{customLinkError}</p>}
            {customYoutubeIds[currentLesson.id] && (
              <div className="mt-2 text-lime-800 bg-lime-50/70 border border-lime-200 py-1 px-2.5 rounded text-[11px] flex justify-between items-center">
                <span>✓ วิดีโอบทนี้ถูกสับเปลี่ยนเป็นรหัสที่ท่านป้อนเองแล้ว</span>
                <button
                  onClick={() => {
                    setCustomYoutubeIds((prev) => {
                      const updated = { ...prev };
                      delete updated[currentLesson.id];
                      return updated;
                    });
                  }}
                  className="underline hover:text-red-700 text-[10px] cursor-pointer"
                >
                  (คืนสู่ค่าเริ่มต้น)
                </button>
              </div>
            )}
          </div>

          {/* Fallback bar if cookies or iframe restrictions block YouTube playback */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 mb-6 shadow-sm">
            <span className="text-xs text-amber-900/90 font-medium font-sans flex items-center gap-1.5">
              <span>💡</span> หากวิดีโอไม่แสดงเนื่องจากการตั้งค่าเบราว์เซอร์หรือปลั๊กอินความปลอดภัย:
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${currentVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm hover:scale-[1.02] active:scale-95 cursor-pointer font-sans shrink-0 uppercase tracking-wide"
            >
              <span>🔴</span> เปิดเรียนบน YouTube สดใหม่
            </a>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg text-slate-500 text-xs border border-slate-200">
            <span>บทต่อไป: {currentModule.lessons[activeLessonIndex + 1]?.titleThai || "ควิซวัดประเมินผล"}</span>
            <div className="flex gap-2">
              {activeLessonIndex < currentModule.lessons.length - 1 ? (
                <button
                  id="btn-next-lesson"
                  onClick={() => setActiveLessonIndex((prev) => prev + 1)}
                  className="bg-indigo-900 hover:bg-indigo-805 text-white font-bold py-1 px-3 rounded text-xs flex items-center gap-1 cursor-pointer transition-all"
                >
                  เรียนบทถัดไป
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 font-mono font-semibold uppercase">
                  💡 เรียนออนไลน์ครบแล้วกรุณาทำแบบฝึกทดสอบควิซด้านล่าง
                </span>
              )}
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE PRACTICE QUIZZES UNIT PANEL */}
        <div id="quiz-block" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="text-indigo-900 w-5 h-5" />
            <h3 className="text-base font-display font-bold text-slate-800">
              แบบทดสอบควิซประจำบทเรียน: {currentModule.title.split(". ")[1]}
            </h3>
          </div>

          {!quizSubmitted ? (
            <div className="space-y-6">
              {currentModule.quiz.map((q, qidx) => {
                const selectedAns = quizAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-xs font-semibold text-slate-800 mb-2.5">
                      คำถามที่ {qidx + 1}: {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oidx) => {
                        const isChosen = selectedAns === oidx;
                        return (
                          <button
                            key={oidx}
                            id={`quiz-q-${q.id}-${oidx}`}
                            onClick={() => handleSelectAnswer(q.id, oidx)}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center gap-2 ${
                              isChosen
                                ? "bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] ${
                              isChosen ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                            }`}>
                              {oidx + 1}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {quizError && <p className="text-xs text-red-500 font-semibold text-center">{quizError}</p>}

              <button
                id="btn-submit-quiz"
                onClick={handleSubmitQuiz}
                className="w-full bg-indigo-900 hover:bg-indigo-805 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                ส่งคำตอบควิซรอบนี้
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <span className="text-3xl">🎯</span>
              <h4 className="text-lg font-bold text-slate-800 mt-2">ประเมินผลคะแนนเสร็จสิ้น!</h4>
              
              <div className="my-4 max-w-md mx-auto p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono">
                <p className="text-sm">คะแนนที่ทำได้:</p>
                <span className="text-3xl font-bold text-indigo-900">
                  {quizScore} / {currentModule.quiz.length} คะแนน
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  หมายเหตุ: ท่านต้องทดสอบตอบถูก 100% ครบทุกข้อเพื่อรับสิทธ์ผ่านโมดูลหลักสูตรนี้
                </p>
              </div>

              {quizScore === currentModule.quiz.length ? (
                <div className="text-xs text-lime-800 font-bold bg-lime-100/60 p-3 rounded-lg max-w-sm mx-auto border border-lime-300">
                   ยินดีด้วยครับ! คุณตอบผ่านถูกต้องครบถ้วน 100%! <br />
                  <span className="font-semibold block mt-1">
                    ระบบอัปเดตสถานะของยูนิต {currentModule.id} เรียบร้อย สั่งสะสมแต้ม 100 แต้ม!
                  </span>
                </div>
              ) : (
                <div className="text-xs text-amber-700 font-bold bg-amber-50 p-3 rounded-lg max-w-sm mx-auto border border-amber-200">
                  ⚠️ น่าเสียดาย! คุณยังตอบไม่ถูกครบทุกข้อเฉลย <br />
                  <span className="font-normal block text-slate-500 mt-1">
                    คำทำนาย: ท่าจับไม้ V-Shape หรือ Lunge เข่า 90 องศา เป็นจุดสำคัญ ลองทบทวนวิดีอีกครั้งนะ
                  </span>
                </div>
              )}

              <div className="flex gap-2 justify-center mt-6">
                <button
                  id="btn-retry-quiz"
                  onClick={handleResetQuiz}
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> ทำใหม่อีกครั้ง
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FULL-STRENGHT HIDDEN GEOMETRIC CANVAS RENDERING CERTIFICATE DIALOG */}
      <AnimatePresence>
        {isCertificateModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full border border-slate-200 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="text-lime-500 w-6 h-6" />
                  <h3 className="font-display font-bold text-slate-800 text-lg">
                    รับมอบเกียรติบัตรรับรองวิทยฐานะพอร์ท
                  </h3>
                </div>
                <button
                  id="btn-close-cert-modal"
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Visual Preview on Screen (CSS Beautiful Layout matching PDF style) */}
              <div className="p-1 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative shadow-inner">
                <div className="bg-amber-50/10 p-6 md:p-10 text-center border-4 border-indigo-900 rounded-xl relative">
                  <div className="absolute inset-2 border border-amber-500/30 font-medium pointer-events-none" />
                  <span className="text-[10px] font-mono tracking-widest text-indigo-900 font-bold block">
                    PRN BADMINTON CENTER & ONLINE COURT ACCREDITATION
                  </span>
                  <p className="text-2xl font-display font-bold text-amber-600 mt-2">CERTIFICATE OF EXCELLENCE</p>
                  <span className="text-xs text-slate-400 italic block mt-0.5">เกียรติบัตรรับรองความรู้ทักษะแบดมินตันอัจฉริยะ</span>

                  <p className="text-xs text-slate-600 mt-6">เกียรติบัตรฉบับนี้ออกไว้ให้เพื่อรับรองวิทยฐานะของ</p>
                  <h1 className="text-2xl md:text-3xl font-display font-extrabold text-indigo-900 my-3">
                    {user.name}
                  </h1>

                  <div className="w-1/2 h-0.5 bg-amber-500/60 mx-auto" />

                  <p className="text-xs text-slate-650 mt-4 leading-relaxed max-w-md mx-auto">
                    ผู้ซึ่งศึกษาหลักสูตรครบถ้วนและตอบคำถามการสอบประเมินยูนิตฟุตเวิร์ค (Footwork), ลูกหยอด (Slicing Cut), ลูกตบความเร็วสูง (Powerful Smash), ลูกปั่นม้วนตาข่าย (Spin Net) และสมดุลคู่อย่างอัจฉริยะ ครบ {ACADEMY_CURRICULUM.length} ระดับมาตรฐานระดับอาชีพ
                  </p>

                  {/* Signers mockup */}
                  <div className="flex justify-between items-center mt-12 px-6">
                    <div className="text-center">
                      <span className="text-[11px] font-bold text-slate-800 block">สถาบัน PRN Badminton Center</span>
                      <span className="text-[8px] text-slate-400 block border-t border-slate-200 pt-1 mt-1">ผู้ควบคุมตารางคิวและสนาม</span>
                    </div>
                    {/* Golden stamp icon */}
                    <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-indigo-950 border-2 border-amber-500 text-[8px] font-bold">
                      VERIFIED
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] font-bold text-slate-800 block">ฝ่ายการเรียนรู้ออนไลน์</span>
                      <span className="text-[8px] text-slate-400 block border-t border-slate-200 pt-1 mt-1">ผู้อำนวยการส่วนเทคโนโลยีเพื่อเยาวชน</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden compile canvas */}
              <canvas ref={canvasRef} className="hidden" style={{ width: "1200px", height: "850px" }} />

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  id="btn-download-cert"
                  onClick={generateAndDownloadCertificateImage}
                  className="w-full bg-indigo-900 hover:bg-indigo-805 text-white font-bold py-3 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-900/10 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  ดาวน์โหลดเป็นไฟล์รูปภาพความละเอียดสูง (.PNG Download)
                </button>
                <button
                  id="btn-close-cert-foot"
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="w-full sm:w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-650 font-bold py-3 rounded-2xl text-xs transition-all cursor-pointer border border-slate-200"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
