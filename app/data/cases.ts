export const cases = [
  {
    id: "1",
    title: "ABS/ESP Warnmeldung",
    bus: "High-Speed-CAN",
    system: "ABS/ESP",
    customer: "Frau Berger",
    avatar: "/images/rita.png",
    background: "/images/ritaback.png",
    vehicle: "Audi A4 · 2.0 TDI · 2011",
    complaint:
      "Während der Fahrt erscheinen sporadisch ABS- und ESP-Warnmeldungen. Besonders bei Regen tritt der Fehler häufiger auf.",
    faultCode: "U0121 - Kommunikation mit ABS/ESP-Steuergerät gestört",
    suspectedFault:
      "Masseschluss auf der CAN-High-Leitung im Bereich des ABS/ESP-Steuergerätes.",
    audio: "/audio/problem1.mp3",
transcript: `
Guten Morgen. Ich hoffe, Sie können sich mein Fahrzeug mal anschauen. Ich habe seit einiger Zeit Probleme mit meinem Porsche Cayenne. Immer wenn es draußen stark geregnet hat oder das Fahrzeug längere Zeit im Nassen stand, leuchtet während der Fahrt sporadisch die ABS- beziehungsweise ESP-Kontrollleuchte im Kombiinstrument auf. Manchmal verschwindet der Fehler nach einem Neustart wieder, manchmal bleibt die Lampe aber auch während der ganzen Fahrt aktiv.

Mein Neffe ist selbst etwas technisch interessiert und hatte zuerst den Raddrehzahlsensor im Verdacht. Den haben wir bereits ersetzt, weil wir dachten, dass damit das Problem erledigt wäre. Leider hat sich danach überhaupt nichts verändert. Die Fehlermeldung tritt weiterhin sporadisch auf.

Gestern Morgen wurde es dann allerdings etwas schlimmer. Während der Fahrt hat das Fahrzeug plötzlich kaum noch Leistung angenommen und ist scheinbar in eine Art Notlauf gegangen. Ich konnte zwar noch weiterfahren, aber man hat deutlich gemerkt, dass etwas nicht stimmt. Spätestens da war mir klar, dass ich den Wagen lieber mal in einer Werkstatt überprüfen lassen sollte.

Das Problem ist nur, dass ich heute Nachmittag noch einen wichtigen Termin habe und deshalb nicht lange auf das Fahrzeug verzichten kann. Ich könnte Ihnen den Cayenne ungefähr für anderthalb Stunden hierlassen. Für eine Reparatur müsste man dann gegebenenfalls einen weiteren Termin vereinbaren. Mir würde es heute erstmal reichen, wenn der Fehler eingegrenzt oder im besten Fall sogar diagnostiziert werden kann, damit man ungefähr weiß, wo das Problem liegt.
`,
    intakeKeywords: {
      complaint: ["abs", "esp", "warnmeldung", "warnlampe", "leuchtet"],
      conditions: ["sporadisch", "regen", "fahrt", "nass", "feuchtigkeit"],
      repairs: ["keine", "noch nicht", "nicht repariert", "nicht geprüft"],
      notes: ["abs", "esp", "steuergerät", "kommunikation"],
    },
    keywords: [
      "can",
      "can high",
      "can-high",
      "high speed",
      "masseschluss",
      "kurzschluss",
      "abs",
      "esp",
      "steuergerät",
      "kommunikation",
      "u0121",
      "feuchtigkeit",
      "regen",
    ],
    diagnosis: {
      faultDescription:
        "ABS- und ESP-Warnmeldungen erscheinen sporadisch, besonders bei Regen oder Feuchtigkeit.",
      suspectedCause:
        "Masseschluss auf der CAN-High-Leitung im Bereich des ABS/ESP-Steuergerätes.",
      measuringStrategy: [
        "Fehlerspeicher auslesen",
        "CAN-High und CAN-Low am ABS/ESP-Steuergerät messen",
        "Signalpegel bei Zündung ein prüfen",
        "Leitung im feuchtigkeitsgefährdeten Bereich kontrollieren",
      ],
      expectedResult:
        "Bei intaktem High-Speed-CAN pendeln CAN-High und CAN-Low gegensinnig um etwa 2,5 V.",
    },
signalComparison: {
  title: "CAN-High Masseschluss",
  faultSignal: "/images/problem1_fault.png",
  description:
    "Oszilloskopaufnahme eines CAN-High-Masseschlusses.",
},
    wiringDiagram: {
      title: "Stromlaufplan ABS/ESP High-Speed-CAN",
      image: "/images/schaltplan-problem1.png",
      measuringPoints: [
        "CAN-High am ABS/ESP-Steuergerät",
        "CAN-Low am ABS/ESP-Steuergerät",
        "Masse",
        "Spannungsversorgung ABS/ESP",
      ],
    },
    measurementTasks: [
      "CAN-High gegen Masse messen.",
      "CAN-Low gegen Masse messen.",
      "Differenzsignal mit dem Oszilloskop prüfen.",
      "Leitungssatz am ABS/ESP-Steuergerät auf Feuchtigkeit prüfen.",
    ],
  },
  {
    id: "2",
    title: "Drehzahlmesser fällt aus",
    bus: "Low-Speed-CAN",
    system: "Kombiinstrument",
    customer: "Herr Scholz",
    avatar: "/images/michael.png",
    background: "/images/michaelback.png",
    vehicle: "VW Passat · 1.8 TSI · 2010",
    complaint:
      "Der Drehzahlmesser fällt sporadisch aus. Nach längerer Fahrt oder bei Erwärmung funktioniert er teilweise wieder.",
    faultCode: "01317 - Steuergerät im Schalttafeleinsatz keine Kommunikation",
    suspectedFault:
      "Übergangswiderstand auf der CAN-Low-Leitung im Bereich des Kombiinstruments.",
    audio: "/audio/problem2.mp3",
   transcript: `
Guten Morgen. Ich hätte da mal ein Problem mit meinem Auto. Und zwar fällt seit ein paar Tagen immer mal wieder der Drehzahlmesser aus. Das passiert meistens während der Fahrt. Der Zeiger geht dann plötzlich komplett auf null runter, obwohl der Motor ganz normal weiterläuft. Also man merkt eigentlich nichts am Fahrverhalten selbst. Das Auto zieht normal durch und es leuchtet auch keine Motorkontrollleuchte oder sowas auf.

Mir ist aber aufgefallen, dass der Fehler nicht dauerhaft da ist. Manchmal funktioniert alles ganz normal und dann plötzlich eben wieder nicht. Gestern auf der Autobahn ist der Drehzahlmesser bestimmt fünf Minuten komplett ausgefallen und nach einem Neustart vom Fahrzeug ging er dann wieder. Heute früh war erstmal wieder alles normal.

Ich weiß jetzt natürlich nicht, ob das nur am Kombiinstrument liegt oder ob da vielleicht irgendwo ein größeres elektrisches Problem dahinter steckt. Deshalb wollte ich das lieber mal überprüfen lassen, bevor nachher noch mehr ausfällt.

Das Problem ist nur, dass ich beruflich auf das Auto angewiesen bin. Ich könnte Ihnen das Fahrzeug heute maximal für ungefähr 90 Minuten hierlassen. Für eine Reparatur müsste man dann später nochmal einen Termin machen. Mir würde es erstmal reichen, wenn Sie den Fehler etwas eingrenzen könnten und mir sagen können, woran es wahrscheinlich liegt beziehungsweise was eventuell gemacht werden müsste.
`,
    intakeKeywords: {
      complaint: ["drehzahlmesser", "drehzahl", "kombiinstrument", "fällt aus"],
      conditions: ["sporadisch", "längere fahrt", "erwärmung", "warm"],
      repairs: ["keine", "noch nicht", "nicht repariert", "nicht geprüft"],
      notes: ["schalttafeleinsatz", "kommunikation", "can", "anzeige"],
    },
    keywords: [
      "can",
      "can low",
      "can-low",
      "low speed",
      "Leitungsunterbrechung",
      "Unterbrechung",
      "kombiinstrument",
      "schalttafeleinsatz",
      "drehzahlmesser",
      "kommunikation",
      "01317",
      "erwärmung",
      "warm",
      "Leitung",
    ],
    diagnosis: {
      faultDescription:
        "Der Drehzahlmesser fällt sporadisch aus. Nach längerer Fahrt oder bei Erwärmung funktioniert er teilweise wieder.",
      suspectedCause:
        "Übergangswiderstand auf der CAN-Low-Leitung im Bereich des Kombiinstruments.",
      measuringStrategy: [
        "Fehlerspeicher auslesen",
        "CAN-Low-Leitung am Kombiinstrument prüfen",
        "Spannungsabfall bzw. Signalform bei Erwärmung beobachten",
        "Steckverbindung und Leitungssatz am Schalttafeleinsatz prüfen",
      ],
      expectedResult:
        "Bei intakter Low-Speed-CAN-Kommunikation sind stabile Signalpegel ohne starke Verformung oder Pegelverschiebung erkennbar.",
    },
signalComparison: {
  title: "CAN-Low <unterbrechung",
  faultSignal: "/images/problem2_fault.png",
  description:
    "Oszilloskopaufnahme eines CAN-Low-Signals mit Unterbrechung.",
},
    wiringDiagram: {
      title: "Stromlaufplan Kombiinstrument Low-Speed-CAN",
      image: "/images/schaltplan-problem2.png",
      measuringPoints: [
        "CAN-Low am Kombiinstrument",
        "CAN-High am Kombiinstrument",
        "Spannungsversorgung Kombiinstrument",
        "Masse Kombiinstrument",
      ],
    },
    measurementTasks: [
      "CAN-Low am Kombiinstrument mit dem Oszilloskop prüfen.",
      "Signalpegel im kalten und warmen Zustand vergleichen.",
      "Steckverbindung am Schalttafeleinsatz prüfen.",
      "Leitung auf Übergangswiderstand prüfen.",
    ],
  },
  {
    id: "3",
    title: "Fensterheber ohne Funktion",
    bus: "LIN-BUS",
    system: "Türsteuergerät hinten links",
    customer: "Herr Tille",
    avatar: "/images/walter.png",
    background: "/images/walterback.png",
    vehicle: "VW Passat B7 · 1,8 TSI · 118 kW · 2012",
    complaint:
      "Sporadischer Ausfall des Fensterhebers hinten links. Bedienung weder über den hinteren Taster noch über die Fahrertür möglich.",
    faultCode: "01334 - Türsteuergerät hinten links keine Kommunikation",
    suspectedFault:
      "Kontaktproblem der LIN-Datenleitung an der Steckverbindung T28a/6 oder T28/6 der B-Säule.",
    audio: "/audio/problem3.mp3",
    transcript: `
Moin. Ich habe da ein etwas seltsames Problem mit meinem Auto. Und zwar funktioniert der Fensterheber hinten links manchmal einfach nicht mehr. Das Ganze fing vor ungefähr zwei Wochen an. Erst dachte ich noch, das Fenster wäre vielleicht nur festgefroren oder der Schalter hätte einen Wackelkontakt, aber mittlerweile passiert das auch bei gutem Wetter.

Besonders peinlich wurde es letzte Woche an der Waschstraße. Ich wollte das Fenster hinten noch schnell schließen und natürlich ging genau in dem Moment gar nichts mehr. Meine Tochter hinten drin hat schon Panik bekommen, weil das Fenster halb offen stehen geblieben ist und die Bürsten schon näher kamen. Nach ein paar Minuten und mehrmaligem Motor an und aus ging es dann plötzlich wieder ganz normal.

Seitdem tritt der Fehler immer mal wieder auf. Manchmal funktioniert der Fensterheber hinten links sofort, manchmal reagiert er weder über den Schalter hinten an der Tür noch über die Bedienung auf der Fahrerseite. Alle anderen Fensterheber funktionieren allerdings ohne Probleme.

Ein Bekannter von mir meinte schon, dass vielleicht einfach nur der Fensterhebermotor kaputt wäre. Bevor ich da jetzt aber anfange, wahllos Teile zu tauschen, wollte ich lieber erstmal nachsehen lassen, ob das vielleicht irgendwo ein elektrisches Problem oder ein Fehler in der Kommunikation zwischen den Steuergeräten ist.

Ich müsste allerdings nachher wieder weiter und könnte Ihnen das Fahrzeug deshalb nur ungefähr anderthalb Stunden hierlassen. Für die eigentliche Reparatur würde ich dann später nochmal einen Termin vereinbaren. Mir würde es heute erstmal reichen, wenn Sie den Fehler möglichst genau eingrenzen könnten.
`,
    intakeKeywords: {
      complaint: [
        "fensterheber",
        "fenster",
        "hinten links",
        "hinten",
        "links",
        "reagiert nicht",
        "funktioniert nicht",
        "ohne funktion",
      ],
      conditions: [
        "sporadisch",
        "manchmal",
        "seit zwei wochen",
        "zwei wochen",
        "waschstraße",
        "motor an und aus",
        "gutem wetter",
      ],
      repairs: [
        "fensterhebermotor",
        "motor",
        "kaputt",
        "teile tauschen",
        "wahllos teile",
        "bekannter",
      ],
      notes: [
        "andere fensterheber",
        "fahrerseite",
        "schalter hinten",
        "kommunikation",
        "steuergeräte",
        "anderthalb stunden",
      ],
    },
    keywords: [
      "lin",
      "datenleitung",
      "stecker",
      "kontakt",
      "unterbrechung",
      "t28a/6",
      "t28/6",
      "b-säule",
      "b säule",
      "türsteuergerät",
      "keine kommunikation",
      "lin bus",
      "sleep-in",
      "sleepmode",
      "sleep-mode",
      "wert",
      "defekt",
      "spannungsversorgung",
      "sicherung",
    ],
    diagnosis: {
      faultDescription:
        "Der Fensterheber hinten links fällt sporadisch aus. Die Bedienung ist weder über den hinteren Schalter noch über die Fahrertür möglich.",
      suspectedCause:
        "Kontaktproblem oder Unterbrechung der LIN-Datenleitung zwischen Türsteuergerät hinten links und dem übergeordneten Tür-/Komfortsystem.",
      measuringStrategy: [
        "Fehlerspeicher auslesen",
        "LIN-Signal an der Steckverbindung B-Säule prüfen",
        "Spannungsversorgung am Türsteuergerät prüfen",
        "Masseverbindung prüfen",
        "Steckverbindung T28a/6 bzw. T28/6 kontrollieren",
      ],
      expectedResult:
        "Bei intakter Kommunikation ist ein LIN-Signal mit Ruhepegel nahe Batteriespannung und kurzen dominanten Pulsen gegen Masse erkennbar.",
    },
    signalComparison: {
      title: "LIN-BUS-Signal Fensterheber hinten links",
      normalSignal: "/images/lin-normal.png",
      faultSignal: "/images/lin-fehler.png",
      description:
        "Vergleich zwischen einem intakten LIN-Signal und einer gestörten LIN-Kommunikation am Türsteuergerät hinten links.",
    },
    wiringDiagram: {
      title: "Stromlaufplan Türsteuergerät hinten links",
      image: "/images/schaltplan-problem3.png",
      measuringPoints: [
        "T28a/6 LIN-Datenleitung",
        "T28/6 Steckverbindung B-Säule",
        "Klemme 30 Spannungsversorgung",
        "Masseanschluss Türsteuergerät",
      ],
    },
    measurementTasks: [
      "LIN-Signal an T28a/6 mit dem Oszilloskop prüfen.",
      "Spannungsversorgung am Türsteuergerät hinten links messen.",
      "Masseverbindung unter Last prüfen.",
      "Steckverbindung an der B-Säule optisch und elektrisch prüfen.",
    ],
  },
  {
    id: "4",
    title: "Fahrzeug startet nicht",
    bus: "High-Speed-CAN",
    system: "Motorsteuergerät",
    customer: "Frau Neumann",
    avatar: "/images/roswita.png",
    background: "/images/roswitaback.png",
    vehicle: "Golf 7 · 2.0 Benzin · 2012",
    complaint:
      "Beim Einschalten der Zündung erscheinen mehrere Warnmeldungen. Das Fahrzeug startet zeitweise nicht.",
    faultCode: "U0100 - Kommunikation mit Motorsteuergerät verloren",
    suspectedFault: "Fehlende Spannungsversorgung des Motorsteuergerätes.",
    audio: "/audio/problem4.mp3",
        transcript: `
Also ganz ehrlich, ich bin mittlerweile echt genervt von diesem Auto. Gestern war plötzlich während der Fahrt gefühlt der halbe Weihnachtsbaum im Kombiinstrument an. ABS, ESP, Motorkontrollleuchte, alles gleichzeitig. Und natürlich genau dann, als ich sowieso schon spät dran war.

Ich dachte erst noch, das wäre wieder irgendeine sinnlose Fehlermeldung, die nach einem Neustart verschwindet, aber nein — nachdem ich kurz beim Bäcker angehalten habe, sprang der Wagen plötzlich überhaupt nicht mehr an. Der Anlasser dreht zwar ganz normal, aber sonst passiert einfach nichts mehr. Für mich klingt das ehrlich gesagt nach einem größeren Problem und nicht nach irgendeiner Kleinigkeit.

Ein Bekannter von mir hat dann gestern Abend noch versucht, mit so einem Diagnosegerät den Fehlerspeicher auszulesen. Das Lustige war nur, dass er gar keine Verbindung zum Motorsteuergerät bekommen hat. Also entweder hat das Steuergerät selbst irgendeinen Schaden oder da stimmt elektrisch irgendwas überhaupt nicht mehr.

Die Batterie wurde übrigens auch schon geprüft, daran liegt es angeblich nicht. Ich kenne mich technisch jetzt nicht besonders aus, aber normal kann das ja alles nicht sein. Vor allem weil bei einem Fahrzeug in der Preisklasse eigentlich erwartet werden kann, dass es einfach fährt und nicht plötzlich komplett den Dienst verweigert.

Das Problem ist jetzt nur, dass ich heute Nachmittag noch einen Termin habe und deshalb ehrlich gesagt nicht ewig auf das Auto verzichten kann. Ich könnte den Wagen ungefähr anderthalb Stunden hierlassen. Für die Reparatur machen wir dann später nochmal einen Termin. Aber ich hätte schon gerne erstmal eine vernünftige Aussage, was da überhaupt kaputt ist und ob das jetzt etwas Größeres wird.
`,
    intakeKeywords: {
      complaint: ["startet nicht", "springt nicht an", "warnmeldungen", "zündung"],
      conditions: ["zeitweise", "sporadisch", "beim einschalten", "zündung"],
      repairs: ["keine", "noch nicht", "nicht repariert", "nicht geprüft"],
      notes: ["motorsteuergerät", "kommunikation", "spannungsversorgung"],
    },
    keywords: [
      "motorsteuergerät",
      "motorsteuergeraet",
      "spannung",
      "spannungsversorgung",
      "klemme 30",
      "klemme 15",
      "masse",
      "sicherung",
      "relais",
      "u0100",
      "keine kommunikation",
      "startet nicht",
    ],
    diagnosis: {
      faultDescription:
        "Beim Einschalten der Zündung erscheinen mehrere Warnmeldungen. Das Fahrzeug startet zeitweise nicht.",
      suspectedCause:
        "Fehlende Spannungsversorgung des Motorsteuergerätes durch Sicherung, Relais, Leitung oder Masseproblem.",
      measuringStrategy: [
        "Fehlerspeicher auslesen",
        "Spannungsversorgung am Motorsteuergerät prüfen",
        "Masseverbindung unter Last prüfen",
        "Sicherung und Relais prüfen",
        "CAN-Kommunikation erst nach gesicherter Spannungsversorgung bewerten",
      ],
      expectedResult:
        "Bei intakter Versorgung liegen Klemme 30, Klemme 15 und Masse stabil am Motorsteuergerät an.",
    },
signalComparison: {
  title: "Fehlende Spannungsversorgung Motorsteuergerät",
  faultSignal: "/images/problem4_fault.png",
  description:
    "Messaufnahme der Spannungsversorgung am Motorsteuergerät.",
},
    wiringDiagram: {
      title: "Stromlaufplan Motorsteuergerät Spannungsversorgung",
      image: "/images/schaltplan-problem4.png",
      measuringPoints: [
        "Klemme 30 Motorsteuergerät",
        "Klemme 15 Motorsteuergerät",
        "Masse Motorsteuergerät",
        "Sicherung Motorsteuergerät",
        "Relais Motorsteuergerät",
      ],
    },
    measurementTasks: [
      "Klemme 30 am Motorsteuergerät prüfen.",
      "Klemme 15 bei eingeschalteter Zündung prüfen.",
      "Masseverbindung mit Last prüfen.",
      "Sicherung und Relais der Motorsteuergeräteversorgung prüfen.",
    ],
  },
  {
id: "5",
title: "Scheibenwischer lässt sich nicht abschalten",
bus: "CAN-B",
system: "Komfort-CAN",
customer: "Herr Krause",
avatar: "/images/max.png",
background: "/images/maxback.png",
vehicle: "VW Passat B7 · 2,0 TDI · 2012",

complaint:
  "Nach dem Einschalten des Scheibenwischers läuft dieser dauerhaft weiter und lässt sich über den Wischerhebel nicht mehr abschalten.",

faultCode:
  "U1003 - Kommunikation Komfort-CAN fehlerhaft",

suspectedFault:
  "Leitungsunterbrechung auf der CAN-High-Leitung im Komfort-CAN.",

audio: "/audio/problem5.mp3",

   transcript: `
Guten Tag.

Ich habe seit ungefähr einer Woche ein Problem mit meinem Passat. Der Scheibenwischer vorne macht sich irgendwie selbstständig. Wenn ich den Wischerhebel betätige, läuft der Scheibenwischer ganz normal an. Das Problem ist nur, dass er sich anschließend nicht mehr ausschalten lässt.

Egal ob ich den Hebel wieder zurückstelle oder in die Aus-Position bringe, der Wischer läuft einfach weiter. Manchmal wischt er dauerhaft auf Intervallgeschwindigkeit, manchmal läuft er sogar durchgehend weiter. Erst wenn ich die Zündung ausschalte und das Fahrzeug verriegele, hört er irgendwann auf.

Der Fehler ist nicht von Anfang an aufgetreten. Zuerst ist das nur gelegentlich passiert. Inzwischen tritt das aber fast jedes Mal auf, sobald ich den Scheibenwischer einschalte.

Mir ist außerdem aufgefallen, dass die übrigen Funktionen am Fahrzeug ganz normal arbeiten. Die Beleuchtung funktioniert, die Fensterheber funktionieren und auch sonst habe ich keine Warnmeldungen im Kombiinstrument bemerkt. Es scheint wirklich nur den Scheibenwischer zu betreffen.

Vor ein paar Tagen hat ein Bekannter von mir vermutet, dass vielleicht der Wischerhebel defekt sein könnte. Deshalb habe ich kurz überlegt, den Hebel austauschen zu lassen. Bevor ich aber unnötig Teile kaufe, wollte ich das Fahrzeug lieber einmal fachgerecht überprüfen lassen.

Bisher wurde an dem Fahrzeug in diesem Bereich noch nichts repariert oder ausgetauscht. Auch der Wischermotor wurde noch nicht geprüft. Das Problem besteht unverändert.

Ich muss heute Nachmittag noch einen Termin wahrnehmen. Deshalb wäre es zunächst hilfreich, wenn Sie die Ursache eingrenzen könnten. Einen Reparaturauftrag würde ich dann gegebenenfalls im Anschluss mit Ihnen besprechen.

Vielen Dank
`,

intakeKeywords: {
  complaint: [
    "scheibenwischer",
    "wischer",
    "abschalten",
    "läuft weiter",
    "dauerlauf",
    "nicht ausschalten",
    "wischerhebel",
  ],

  conditions: [
    "dauerhaft",
    "immer",
    "sporadisch",
    "gelegentlich",
    "nach einschalten",
    "plötzlich",
  ],

  repairs: [
    "keine",
    "noch nicht",
    "nicht repariert",
    "nicht geprüft",
    "wischermotor",
    "wischerhebel",
  ],

  notes: [
    "can",
    "komfort can",
    "datenbus",
    "kommunikation",
    "steuergerät",
  ],
},

keywords: [
  "can",
  "can-b",
  "can b",
  "komfort-can",
  "komfort can",
  "datenbus",
  "kommunikation",
  "can high",
  "can-high",
  "leitungsunterbrechung",
  "wischer",
  "scheibenwischer",
  "u1003",
],

diagnosis: {
  faultDescription:
    "Der Scheibenwischer lässt sich nach dem Einschalten nicht mehr abschalten und läuft dauerhaft weiter.",

  suspectedCause:
    "Unterbrechung der CAN-High-Leitung im Komfort-CAN. Das Steuergerät erhält die Information zum Ausschalten des Scheibenwischers nicht mehr.",

  measuringStrategy: [
    "Fehlerspeicher auslesen",
    "Kommunikation der beteiligten Steuergeräte prüfen",
    "CAN-High und CAN-Low mit dem Oszilloskop messen",
    "Leitungsverlauf der CAN-High-Leitung prüfen",
    "Steckverbindungen im Komfort-CAN kontrollieren",
  ],

  expectedResult:
    "Bei einer Leitungsunterbrechung auf CAN-High ist das differenzielle CAN-Signal gestört. Die Kommunikation zwischen den Steuergeräten ist eingeschränkt oder unterbrochen.",
},

signalComparison: {
  title: "CAN-B Leitungsunterbrechung",
  faultSignal: "/images/problem5_fault.png",
  description:
    "CAN-B Signalbild mit Unterbrechung der CAN-High-Leitung.",
},

wiringDiagram: {
  title: "Stromlaufplan Komfort-CAN Scheibenwischer",

  image:
    "/images/schaltplan-problem5.png",

  measuringPoints: [
    "CAN-High Komfort-CAN",
    "CAN-Low Komfort-CAN",
    "Lenksäulensteuergerät",
    "Bordnetzsteuergerät",
    "Wischermotorsteuergerät",
  ],
},

measurementTasks: [
  "CAN-High und CAN-Low mit dem Oszilloskop prüfen.",
  "Signalpegel der CAN-High-Leitung kontrollieren.",
  "Leitungsunterbrechung durch Durchgangsprüfung eingrenzen.",
  "Steckverbindungen zwischen Lenksäulensteuergerät und Bordnetzsteuergerät prüfen.",
],
  },
];
