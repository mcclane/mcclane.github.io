# About

2nd Year computer science / pre-med student at Cal Poly SLO.


# What I'm currently up to

## Research

### Virtual Drug Screening

I currently work with [Dr. Eagon](https://web.calpoly.edu/~seagon/), a chemistry professor at Cal Poly, to virtually screen small molecules for activity against various protein targets. We currently use a library of 7.5 million compounds from the [ZINC15](http://zinc15.docking.org/) database. The compounds are ranked by their free energy when docked to a protein by either [iDock](https://github.com/HongjianLi/idock) or smina docking programs. The lowest energy (best fitting) compounds are then selected and obtained from suppliers for biological assays performed by our collaborators.

Ongoing Projects:
- Targeting the [SARS-CoV-2 protease](https://cen.acs.org/pharmaceuticals/drug-discovery/Crystal-structures-novel-coronavirus-protease/98/web/2020/03). Virtual screening complete. Waiting on biological assay results.
- Targeting the [falciylsin protein](https://pubmed.ncbi.nlm.nih.gov/12876284/) of Plasmodium falciparum, the parasite that causes malaria. Virtual screening complete. Waiting on biological assay results (everything is shut down due to COVID-19).
- Targeting a [rabies glycoprotein](https://www.rcsb.org/structure/6tou). Virtual screening in progress.

The work of screening these compounds is distributed across machines at Cal Poly using a python program I wrote, [distributed-docking](https://github.com/mcclane/distributed-docking). The result is about 60 processes of the [idock](https://github.com/HongjianLi/idock) or smina docking programs running in parallel. My current record is screening our library of 7.5 million compounds in a week, using only resources at Cal Poly.

### Machine Learning

Applying [neural graph machines](https://arxiv.org/abs/1703.04818) to the METABRIC breast cancer dataset to find relationships between patient metadata and subtypes of breast cancer.

## Volunteering

### The Noor Clinic, Jan 2019 - Present
The [Noor Clinic](https://slonoorfoundation.org/) is a free clinic for patients without health insurance. I help them answer questions along the lines of "How many patients with (type 2 diabetes, high blood pressure, ...) did we see in (2019, 2017, 2016, ...) from (North County, San Luis Obispo, Templeton, ...)?" It involves piecing together data from an outdated EMR and excel spreadsheets. Python and the pandas library are very helpful.

I also help collect the data we use to answer these questions from the paper patient charts used in the clinic.


## Work

### Computer Science Tutoring, Feb 2019 - Present
Tutor students in intro CS classes as a department tutor. At the time of writing, May 2020, tutoring is over Zoom!

### Scribing, Associated Surgeons of San Luis Obispo, Apr 2019 - Present 
I chart patient visits in the electronic medical record system for a general surgeon in San Luis Obispo.

## Personal Projects

+ [LogP predictor using Neural Networks](https://github.com/mcclane/logp-smiles-cnn). Predicts the LogP (octanol/water partition coeffient) of a compound based on its SMILES string. Uses a convolutional neural network that convolves over the SMILES string. Uses Tensorflow's Keras library.
+ [Patient Assistance Program PDF Filler](https://github.com/mcclane/noor-patient-assistance). Fills out PDF applications for free drugs from pharmaceutical companies through their patient assistance programs. Developed for use at the Noor Clinic. Uses Angular and PDF-lib.
+ [Venmo Crawler](https://github.com/mcclane/venmo-crawler). Scraped 1 million transactions from my venmo feed, my friends venmo feeds, and their friends friends venmo feeds. Written in python.
+ [Instagram Bot](https://github.com/mcclane/instagramBot). Automates following, liking, and commenting on Instagram. Build with python's request library.


## Past Work Experience

### PolySat, Software Team Member, Nov 2018 - May 2020.

### Calix, Intern, Jun 2017 - Aug 2018


