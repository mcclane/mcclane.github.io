# About

2nd Year computer science / pre-med student at Cal Poly SLO.

# Research

### Virtual Drug Screening
I currently work with [Dr. Eagon](https://web.calpoly.edu/~seagon/), a chemistry professor at Cal Poly, to virtually screen small molecules for activity against various protein targets. We currently use a library of 7.5 million compounds from the [ZINC15](http://zinc15.docking.org/) database. The compounds are ranked by their free energy when docked to a protein by either [iDock](https://github.com/HongjianLi/idock) or smina docking programs. The lowest energy (best fitting) compounds are then selected and obtained from suppliers for biological assays performed by our collaborators.

Ongoing Projects:
- Targeting the [SARS-CoV-2 protease](https://cen.acs.org/pharmaceuticals/drug-discovery/Crystal-structures-novel-coronavirus-protease/98/web/2020/03). Virtual screening complete. Waiting on biological assay results.
- Targeting Plasmodium falciparum's, the parasite that causes malaria, [falciylsin protein](https://pubmed.ncbi.nlm.nih.gov/12876284/). Virtual screening complete. Waiting on biological assay results (everything is shut down due to COVID-19).
- Targeting a [rabies glycoprotein](https://www.rcsb.org/structure/6tou). Virtual screening in progress.

The work of screening these compounds is distributed across machines at Cal Poly using a python program I wrote, [distributed-docking](https://github.com/mcclane/distributed-docking). The result is about 60 processes of the [idock](https://github.com/HongjianLi/idock) or smina docking programs running in parallel. My current record is screening our library of 7.5 million compounds in a week, using only resources at Cal Poly.


### Machine Learning
Applying [neural graph machines](https://arxiv.org/abs/1703.04818) to the METABRIC breast cancer dataset to find relationships between patient metadata and subtypes of breast cancer.

# Personal Projects

# Volunteering

# Work Experience
