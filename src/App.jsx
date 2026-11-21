/**
 * 검단ABA 언어행동연구소 AAC 카드 메이커
 * © 검단ABA 언어행동연구소 · 민다혜 (BCBA)
 *
 * 본 자료는 검단ABA언어행동연구소의 지적재산입니다.
 * 무단 복제·배포·재판매·온라인 게시를 엄격히 금지합니다.
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Upload, X, Plus, Image as ImageIcon, Type, Settings2, Trash2, Copy, FileDown, History, ChevronDown, ChevronUp, Pencil, Search, Share2, FolderOpen, Lock, LogOut, UserPlus, Users, Shield, Eye, EyeOff, RotateCw, FlipHorizontal, GripVertical, Folder, FolderPlus, Edit3, HelpCircle, ArrowRight, Tag, RefreshCw, ArrowUpDown, Crop, Sparkles, Check, Menu, Volume2, VolumeX, Printer, Maximize2 } from 'lucide-react';

/* ================================================================
   도메인 잠금 (지적재산 보호)
   허용 host 외에서는 앱 렌더링 차단
================================================================ */
(function domainGuard() {
  try {
    var host = window.location.hostname;
    var allowed =
      host === 'aba-geomdan.github.io' ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '' ||
      /\.local$/.test(host);
    if (allowed) return;
    document.documentElement.innerHTML =
      '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;' +
      'background:#FFF0F3;font-family:system-ui,-apple-system,sans-serif;padding:24px;">' +
      '<div style="text-align:center;max-width:420px;">' +
      '<div style="font-size:20px;font-weight:700;color:#D4728A;margin-bottom:12px;">접근할 수 없는 페이지</div>' +
      '<div style="font-size:14px;color:#D4728A;line-height:1.6;">검단ABA언어행동연구소의 지적재산입니다.</div>' +
      '</div></div>';
    throw new Error('Unauthorized host');
  } catch (e) {
    if (e && e.message === 'Unauthorized host') throw e;
  }
})();


const LOGO_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAACACAYAAAArkhalAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAA630lEQVR42u19eXxdZbX2s9a79xkyp22apkM6j+k80AlISgsyi0JSQBEnyqBXvF69Xj+FkwjX+Q7qvV6pXkW8KCRMCoJKpSmlgEJHOhcKLS2dh0xn2Hu/a31/7JNQoLZJm2LB7t9vQ5qcs88++3nXetfwrLUI3XhoIsFUVyfXT5x6+6xho6uLNXLAqjHCVqlLFwIpQVOwbtLz+r30xrbf/eTFZXWquoeIwlecObp8UDdei4lIilQrfvWxW1+6cGQFpdJtcOFASU/oxqwqTCyGVbt24sqffe+y11Opx85VdZYAwRnoTgCg7rpQorKSVZWunXH+iOklQyl9uMVPpn1pTWWk7cgz+bafk0f/W3PKk7a0L8kDLcGE4gHy0RnnXauq1KgqZ2D7G4Nd29goAHRi336fLM6JoNnxOK5gYmJlvHmat/1sjv43A2ZiZibrWCTp4mFjrhneo88oZpZEN973GbBPYDtgYimOxcpHFfecF2gGpMSeAYQERtHlk8iCYGENIemlZFrfgXrTjHO/rKqora+nM9D9jcCur65mhdJlwyfeXFE6IJbxgyBiDZESWENr6kTOcKsnsGUTeIHOHTzy+srisrNRXS3VgDkD398A7Or6egWgl44af1axicBX6VbTj5jge2md0Kuvzq+cmyAira+vP4Peuw12AmAmkmH5+TMGl/ScHQS+KNTpdreByLR6ST1/5Nh5n5oy+3yeP9/WV1efke53E+yqRIIVwBVjz7psZM/SaFI8YXT/lqpM8H0fQ6P5uHjEuB+pKldXV3e3+3gG7GOCXVsrAHhexZSzcjgCK9LtD18BGAGYHT7kt9l5wyqG3TKj8t+ppsZqdf0Zy/zdALsaMEQkFw4bM6pvLG9e2ksriLr94ROAgAFWIFAxMWX5SMXMW0f16jXZPHC1TSBxBvBTDfYtiQRVAs7Zg0d8YkxhT7XWWmTjmadCun0D5AcGqVQbppYP0pvOOu+nohKtra+gM+r81IJNc++4I1gCBMOKe3+cjZKINafqiTsCGFGkDaAMTqWaZf6k6ZMuHjLiXqqpsZrQM2CfKrATSJCIUNWAofNnDhqa1xakhWEIp+iZK4V+txBARJBATLETtV+Yc/mVQ/LyzjZfN1J9xjo/NWDXaq0C0Gl9B3+lNDc/5llfwXTKdKlmAXezkXFmg9ZkkuYOGCFfOe9D/yMqxfWhdX5m/+5msNsxLbhizJQC17dQZZJ3QZEemT+LKfhA5rBeM2HG2M9Nr/oe1dRYPRNK7V6wE5WVhoj0uklT5w0s6TE47WesAZizara7AD1eYlSIIKomoIz93IwLPnl234HfopqaM8GW7gS79jOfUQC4cMi4y3rl5WpaRQ0YpPoOiDSrBij7YaxvDWoroWObp+y/nexrnSN+d7TDkkFEDCSZ5qGFxcG/XPChLw8sLJw4/4EHbCUqnTPwnjzYzPPn21ygd1lRjyuNJ4DCCEKpZn279IUBEVJCRhVtrkFgLdq1gM2uBAJ1GGCBFTS7jCAIM2bhguGj7CUWgMKwSweTTeaioaOCr1941ROqOnUpLw0qw/Vy5sgeXVZ3icpK0/jaa3L9+BmfvHbSrCvIWnvM6xBgQEiqgM+ZhsIPzkVrUxPMnoMgJ3ybYxVECusA1hPojIkouvJCNKfSwBt7ETEGx2MsMDF5mYxOKxtSMKioeMIjG1f/fgebw6pqcIbGdGKSnVXhdN7IsRf2cmPwxdLxPsCKBfUoRvHcGYj0643i82bBGgcEhdFQboUAtRaan4vCubMR6VuCXhfMBmJRQCR0vY5rNZJpS7XY+VNnTf/W+Vc8ZsXGDLM9I+EnBjbT/Pl2cH7+8P5FxRdmbEb1ONdgEAIROD0KobkurAicHgXgnDhEAhgFLDGEDFxPYHvkgfJjEBGYojg4L4pABULm+PJJgCgZL5kM/vGs8yf8x0VX/9GKlC5lDhZMmeKeAbtLKjzBUMWVE2dePr73AM4EvuXjhEcVCiaC39oK9gI4zPDb2pAO0jAw8IxCSUCqIDbQlhQ0E0CYoa0+bNqDIQqvRJ2w4gkwvnUyQdreNKPynLuu+MgTIlK1cPlyf3Ei4aALYdUEwInKSmdxIuFoIuEsTiScrKX/nnTvusbwVWUi0l9ce/OzHx0+YUZzsskSsTneB8QscBiAc9k5KJg6Hgd/+yTMC+sRd1ykjUVEAAsGkyLtWfAF56Dw7Mk4vOhZ6NIXEHcc+ERg7fzWK6pwQEEsN895cOPqph83Pv7pJbu3P8BEuO3cc526JUsEOKopQIlEgmpra0FEf9VU0Pp6U1NTgwbAvu/ATgBcB8icAcOG/vsHP7p+dF6hmxQPDKZjXTzgbIrSAhkHMPE4TFMSUTB8o7CsiAaEgAkgCyOKJDNsQS6c5jbEFAiIQMogdI1YqqogwObG88zafbvR8OKz//eNFxZ9CcBuIoLcf3+4UNdVayNquaqiQs3VV1uR8HPiPeL9vzD1/PN7wj230Im6uwOvJZ1jfnvHI/c/A6AFBCQ0wXWok/cV2IsTCWdOXV1w59zL6r4484Lbg0wq8Jmc41HC2yn97dx+FQGxA0saxrmzrpXJks44SzgUVTjE8BBmuxyhEzKqHVWkYTU3GhdRNk8f2Llh+Wub/+trv3/4DwBeOcpbcqcOG3beleUjvzpv3OQRgwt6FveEAxBDFDjkedjutb3euGX1n+58rP5XB4EnE4kE19Wd/oB3FmxSVRBR7MHqBeuvGDN+UHNbq8AYPi7YChApfCgiyhCHEABQBSIWYFX4JgSSNZRwYoA8CxEBuy4EClcFCsKJlRsILAIQsy108kyr+Fi5Z3uyKZP+Q+OOVzQvGlsWM26vGPHYPjl5Uyf0HVg2vEcJkPER+DbwSBCQwlXACLEbjTDHInhg7Sp894mGf1jZfPC/qqurTUNDg33Pg12JSmcJlgTT+vf/0C+vvPGh8ty49XxrhM0x99F2NQ5VcCwKTfvQVArsuHDZATEhYIUCYGEAPuBbpK1C+pQg2r83ZO0mcJYPQSfhLbdH8lRUHGaJua5jHAceBF4QwGUD1zggEXiepxkbiIT8OjryGkqAiiiDgqKiQvPE+pe8Lyx/qP/mTbsO3KbKdcBpK+GdssYb67Ph0RETqsuLe0F8UXSCo6DIqt9A4RXkIXb9B8HnzoJXVoK2CKHNevDTGQTpDLwgg5QxaBlUisjFs9Hrc9dAYnFQWsCErNV+8quamNhCnRYvo83JZJBJpgP4gfXTmaClrdUeTrZpygYEIvN2T4Paw73ERETu4YOH9PyRE6KfHTH3t6Iaq01ol43ed/PoTLCBzPz5FkD+1LLyeREraFE1obTpccE2CkSNC//1vfAPHELBledBUxn4Tc0IDjRB29JhqDQ3CreoCOhVgEg0gszL22GfX4tIPAJVixw/G1rtrlUeAunoES4bgbJuXucWT2CM8ZMt9pLho2f9buLEc6iOnqysrHSWLFkSvCfBrqysNEuWLLEfGDHhovFlA0usl7GBwyYeKMQceyEzAI8By4Icl5F5dAm8vqWIDSmHiZcAfUreomIlVORI7zuE5obfw2UPAENBgPLJ6fFuPhSAASMtHgYUFsi0Xv2/9gRWPdXY2CiniJl16tV4Yxge1XMHDf9Uv7wCpCUAI8sYOY5eDSVbEQsUagiutWi59zEkt+8IfWEoRAUqFpK9Gd29C4fveRCxvQcgUSc08EDwzekX3mZViBKTVR5d1HsMgIhjjJyuqtw5rraqrpYcoM+0AYMnU2A1gLIRgnRh9Qpl/+M4iBxuwaGfPIzM2ZORM3EEnJ6FUCL4+w7DX7EZmWXLEWttA6IROJ5CKXTUT0f6iZICaoBA0a9HLy+0/07fnItz7PBopSGi4Krh4z8yoWdZr7TvB4b4xJMKIoBr0CPlIfnEUhxe9gKc/Hw4SpDDLUBbCnHXRRCNwIo9RrjmtIIcUEXMcdsjOe9JsOnOpUsDAAWj+w34Qu9YTA8lW5j5JGSMCFAg7So46iKa8cGt+0Nyg8OQXBeeAkYEIZvtPZKZNITmdJLDr0jQ0xTwY4HNVtUWuu7wyiGj+2bEV+ombWosgyygxLAxA0EYOSMBTGiOvaswa3bHouxnQ9EpN48VYCUlZtp5+EAagFoRes8ZaInKSoIqPj2tctqk0v7wfE+Iu2fnVBIoCQCFsQI3UBirIFWonnqgqeM+2kGlDqvfEhCYzoFtmWBIxIpgS+uBxwF4jbW1py1Z4q+il+2kQFP7D7q6IBqFp/IOytHJSpMeGZWirsVvT16Ss4X/AhgVsPogCDj7+854eT6sRqIRWnF4ny5bt24hEfRHdXWn7d5zVLAT2WY4I0tLB1YU95khmYyiu8Q6+7BFFVZEVdWKqlVVa1VUVE+5WHSwXkQhUAsiy2yEjRMIYK2V496CqCKmFMQQM4te2fgfi3e+tlrurzenc8rzqABWJRIMgC4ePeGTw0tKor71rCtMcpJ7kVVRqNoIcZDjRlAUz6GieI4pzsk1RfEcUxiNU44TEYc4yC6CUwZ8NrGjObk5xrquacoIt1lxYrGYKYrHyQEHIiod96BvLlKxIlE2QbywyF24atmmrz7e8A1VZaqpOa0tyqOh157h0l9fe9PamhHjKlpbmoUpwp5p54wd26cOGaEhbVShCGARE7KxSMwg4mB/KomtB/dhb7r1oENmYyqdRlFuDnzSkb1jeT2HFvZAcSQO38toJuNp4DAHxiBiw32eFfD5TSOp60gLouToYZdo8avrn/vjSytXRXqV3rd3z45Z5YVFl04fNHr6+UNGOT2dKKzniaeB+CQUEwOHjOFYFHszbfjFC8+89C+LHrmYiXeICuM0ToIc1Rqvzqrwyf36nTeuZ9/RmYwnysxQ6lSCkbP7nWWCkML4VnKiUdiIa5a/vj21bPerf1q/f8/9v1u+bOPuIHgNwP4j3t5zRGHPiWcPGTZz1rCKWeNK+l40oXcfUj8ITNJ3gkiogo2En3MiiRFVhcPGHjZkvvbofc/975q/zDriz08D+Baee3r4taMnfu6SSWdVjenRZ2y/nDwGM1rFYkfzAbzcsv8vf9mz7Rs//NMf/khEqfcC0EeVbK2vN1RTY79y7oU/+/q5l38i6SWDgNUJ2STHB5uUISwgFUBE8nILeMOB/Vj06vofJhbd//3mzJuEASaCFenYSgyzHBmBGlHY84rrp86qvXbKrAkDIjnamkqDDFPAbwLe1QoUEdHc3EJ8a8mjbYnG341R1R0Lp051Fg0ZImP27qU7ly4NRLXdV3bHFxSfN7Kk75TSoh579qvf8qeNyzfvS/prAAgzQ0TeMwGBtz8qZmIRlaH3z//08zUjJvY8mGoDDJMrnXuwAgPhAFFPJFJYwE+8umn7t35X/73n9+36YVay+MapU01ZaghddnaxTikrU9TWChoaaPmiRfyLp57iHv362drPfEappsYCyLl06KjEZ6su+tK8fkMoaEpqOspkOSzj7cpTVihcdmxTIOaan//b3c8c3P2J+666ytS8k3TAicpKvnPp0sDKOwXWMOPXV15pahoaBO8hTvpb4FswZYq7cPny4Nyy8ht+du2Cu/pEcwLft057/U5n3BECI1Arhfn5snDFM3tueeTeiwC89OKCBe63Fy6U+upq0HEYHUwEe/vtXFNXR/WqQkTaPz//E9/58NX/M3/QRKelpYXVNcRd9MlFRfMicX1+3w7vkoXfmdgCbK4G+BgWNFUDPKaykgCgondvXdfQoHVveo3vqYPetp8xEckdcy597EtVF1+cam2R47FH334xa63m5ebTLze+iE/V//xsJl726cmT3IXLlwdMrBJ2o+z3pfPmXVSeU3TRyD49ORV4haymtTntbX56y4a1d6144T4AaU0oUx1hcWWC5yypC8YPGTL2B/OuXFlZ0p8P+BkK2yd2iXEqhbE4N+54dfvcn//7MCbyRZXwd1IxcqSBRswsAEon9R1cCWtJQ8p3p48Aingkhq1Nh1I/WvbH61X12YaaGlPT0GCJSEUl/sWzZ/1nTcWkayvKyvJyYlFALaACIMweXTZiGD42c9rXfvrM0nqqo//HRJizpE6zhMe1CxufuHP4lR+rjTnGOr6YLu3Z2XSphvvs310ddwfY9dXVXNPQYK+beNaMaX3K8/yMJ9TFrAcrrHGj5sfPPLR5+c6dDY4xsCKSleiye6/7+C/njxwx15AHm26ztrmtIy5tmeC5ok7EYFZZ/6HjP1jzlQn9B4/+/O9++1lN6C6qI81qnrrZa1Zce/PUqhGt6WZRh7qYHOvw3f/u6r86wMz2FMOMsqE39SjIg4SJj66oSMTdCK/YvU0e3rzy5vrqanO2iKOJBIlK3/+46JLl11aMn6vpjO+1+WphTMZxjOc6xhrHMIyJBcZxMuSkk2nJA7xbZ1Ze8W+XXV5LdST11dWorapiIsJTq1bc8UZLE0zUnCnYOwGwiefPt4ij76iyfmf71ofg+C2uwtrp9qC22kgkQsv37liyraXluer6em2srlaqq5MFYyd94+ZzZpfZtn2+VXUD1yElgqMK1yoYAoJ01HeTQ5zUTAS2zf/IuPGfrh41/Jr5WaNOROjBnZsfXLr7lZ3RSNSIyBnAuwJ2orLSqCrdNPHcC0f165sXZDxLndCOpNSRkDTM2uJlsPXQ/gYFqLaiwjEPPGABDLp86pQrorCSVnUcUJhwyLL8lMJrCBGEGEoEUoEBkPEyXJqXp/PGjb9dAae2sdE21tYaAlLr9ux8VqAwxyjROXMcBez2XuGzB4yo7mPi8LVzsXylkIelUBg2ZkfzIWzYtO4Fyu6HooqPjRs3fnq/PoWSaVMYQ+2V+8cTR1cUviMGfkrO6jNg5ODc3DlEpHfffbejALbv3/30IT8Dh42eEe1Ogh1muFhGFxUNHNWj7BzxMkphcUZnjNswigUgQi72plJ20e7XUwDQo7ycAGBUn74ze8WjKlaV1UC4c3EIIQaDgcDXYYXF9OGxU/IBAIMGAQA27t6hB1NJOGxOayrQaQV23wULDKB08dCJnxrZs3du0nrW6SRpVykkHEBJHBiKOdFXfGAdE2F2ebkAQGFObj7YkKoDRwwsS0hJOU7m2jMMxzrhuogYtHiZmUf+/fDB1qZUOgPi04lgfJqDfctPf+oDyB9Q1vszua4LCcQEBuBOjOJoz3AJKYmqtnipPgAGKoCthw6FHBCrWe+WYIk6pzIAhCV9hLDwy0cqnSoCgEG9ewsAjCkqe45BsGEbjTNHZ56pFaHxxSXjzx4yssjPZERNmLfulIOdNdAYIKsWOdFoQW/XLVBVrMu+JBOzL4jvq7KSUYGxoe19PFXOClgSgAylUgEOu3gQANovPGT0sIKCnDjEitKZzmedA5sArRwx5oaxhaXsB55aDqVPOwE3AbAcym1AgfTLzdez+g2eCAC7tm5VAGhYtXLZ5oOHxUQcZgnCyo7OXFsNoFYQiZkt+5p2P7pmzTOqSn3jxQqA2loPz++RkwtVtXSmR21ng14omlg28PIoMTwIRwSdspbb39yuBTLWR7/cAhpU2v9aAHzXl78sqsrPvvz69qd2vP48uzlkCRbUOcKBgBEhESXFk9s2PwKgFQ0NvODFuywAqigbdG4Bu/CPSJGeOY6D11l9+p0/ZdDQotYgrZKtahO0kw/QiTOsrgyghqA6o9+QeRFgKF99ta2pqHAA+L9btfq7Ow63wHEYAXfOrRNVGBM1K3e9ESz88zN3ERGmfvvbDCIdU1LS++yBI4aLH6hlUOfuMzzDhrd/nyYdzxk25ksj4gWinh+4Vq2KWFKxJrCWrViW7GmPODt+Zy1ba0nURixZP5P2zhk5iucOG/0hFUFxPK5MhMdf2fz4n3fs2M6uY1SsdGaLMGoDuHFatW/f4280JVfL/febF7/8ZSFAr5xW+ekBvXv2apW054pKx/3I0e7xzdOoWA1UDNoDMX9f6t8ZUj4wL55fwJpsY5iTM2ytWFMeL8LlFVO+/cTLGx746cqVW+3ttztcV+ev3fH6pg+PHVlu4HdKrhwy8H0fa7e9vhyA1jY0mK8/8IDXp6hoYGXpkNpeJh/iUpSipgv3J8bk5uGAobw3IwV/R2A/svzZO3cf3LdwxoDhz0P1pPrMKoD9B1eNkUhkLYA2EUHt+vVh4YQxmwl0PgMadEKm2CEkfR/spTcCoPXr1kFV0aekpGjFrm1Ne5r3H+pVWLgVRER0bFdbVQlE6gdBZHfTwWHLXtnycwC+vf12prq6v5twq/PEpvW/emLT+mUAtnXTNfMAtLb/o2rMGPk6kZTk58dgAUsWlgnucYzAQAJEI3EcCnAeE9XfUlIiDQBWbdmyetWWLUMApAFkTuD+cgG0AQCdxoT+UwI2EYGIttn77jON69ad9CY27447WoPbLFMdYcGUKeb8O+/0VbW8vGfhhyE+AsAcz9pXAGIDjkQjmDps+AU/W7MiWtXY6FUSOUtCol8TAQjuu69r+051tTrGtAW33fZ3JdEd7mwikeA777ij2754cNttDmprxRgj2X5iBZ+bNn3Fd664YqhkDqsjEQqzXccWKkuKqGU57Lj8Tw833Hv3mjUfDQMDWUZqbS0DQCOAxsZGrF+yRBtCR6ITTS9P/WadSCS4qgtsmH3r12vNKe621C7J0az6PWmsATRlfx4+pbDwIx+fe96FH58weXo8sALrsZKB7xAc0eNIN0HVR8wYu8cn87MXlv/hN+tf/uc/79z8Bt7KNX/TgmfG1845x6lbssT+ja2vE1pQqnpc++OkbmpG3z7fv3r6zEvyYUpCSTxxTe6wyQwvKVmd8YNok5ecPrmsT2Rgj2IEqZSKgowSAhaACJ3pnwYSiAqiHBVE4rxx7wHdtG93SyQWeSnwbLKgKG9TKpN69ZG/vMgPrV/77L4geBYADDE+fNWVf5O+ZO2AXVY5e8Z5Iytm2cCDttfwyhHBw46fWVj93LXbdm7/+Z/+dE97J8lTAva/X3Kp/uPc84FkM2DoiIZhb5N9PYo+0KOtYwmTF0KA2CCTTjOY2RWDNlfhqEUk277yWMtKWOFYghLDpwARtdYxjkHUBeAA1mRDfYpkWrD24EFs2LFt/ZPrN9537+b1/wYgmSUpvptSTqqKigEDin/61a9snjl6TE+0tmW7sdNft1CYsa8tg+/df9+V377vvocbamr4VKh0Z2a/AUulrWV2Op3ulmL79uauqspM5LQzkQMWRC0AcDaefhzXSyhblCBwlCFgkw5U1ffA5It29FAixJhxVkmRc1b/3mMuHz/26zWv7qx+bMO6f5hTV7fEMLdXnZxygyyRSBgiCr798QXnzxhQ3lNaD2YQsIGVY2p81iAoKeoVrRg45AYieki1o/9n90bQbEjZZCYiw3zSJ4fN4oxh7vYOBO33SESGiQ0RO0rk+KpO2veRammRYgTB5SOHjfvqnHmNd1542X9akd5ZivQpT4XW1tYqAEwfNeqjFI2r9azjsTiiOMapTiCIIp3WmeMrpk4bOLAPM9vEKaA68ymbuvYuW0NMBIccTkvMafKaZGAuyVfOnXXrNy+5sFFEKpjZnsoB69WAAZHMGzVqxpDS4ouRSSspm84UQxIZQialQ3r37DV73Ljv3q7Ktacgfv++yhgpKZh8ROFyKhDmdJv3L+fOHf2diy55UET61avKqfrO9YsXEwF69XlzPzOgvJT9wBMYDiflHC+MywRPAjakmD1hwofrgCJzCvqpve/Sg6wSts4gg7RQxLa2+l+oPGfk52fOeJCISDWB7n6ICYD5vPOCGf0LesycXHEZfKsQMW9au8c+jChgiJBKytwpk+M3fvCSGSKC+upqPgP2sax44uzGpGACAhHXpFP+Fy/4wPSL+w/899padPtDrK2vJ1Xlj17+0X8ePWhwoZ/KiIPQYe6MMqbQsIUNRIsLe1DVhEm3AEB1fX33WuPv+xAhMVK+Z/rlxPTm86quvayu7vPZxEi3RNISiQSjuloGDepTPmP4qC+Tr0JWWbswb9hmJ9UpwEgldfrQEWdfWjmlFxHt786I3/uf5UECdRyWVErmjR5evOCcc24jIu0u6a6trSUi0s9f9ME7powbrTaVVHLCuaRdqR4kMMCGrJ+yg/v0Lpw7ZsYtlHVhz6jxYxhpRzbeYhU4QvCVKQZ1qvr3+zyAXtX19SdtAFVXVxvDbC+YMOWsD06bfZ14SQ0Ipj2K0/nAJ2WrawAPyiDFxGEDP6lApDvjA+8/A01CwqTJ/l+IoVAQGZZAglnlfXuc06ekkoi0srLyZFwxqq+vh6jGP3/1Vd8aVN5XbdpTk+Xktc8Q7dyenR13BYVDzMik7aShgwcuuPiyS4kIicrumSv6/jPQwPCJkTEMjxmWQ33KADTjo39BDz1//KTJAFBbVXXCn3PXggUOEdmvXnXVP5w3fvQcP33YnjTVJ7tIgiDQwrwe+PDZldUAtLax8cyeDbT3JhMRFUuKIEpi4wY2xmpz1Fo3sIGIiEXYKtOQQ+N79x0GACcKdSKR4Jt/+hP/I5WV/Rdc+sF/iTKEMr7pLgK7gAxSSR1d3vviC86ZOoCJuiWi9p4GW1TEAdlYNMaxnDzjxiJOE8js8QOz37OmTYxxYnlOPCeXoxFXA1KxYjUGHgfARW2t7eq+nQC4trYWItrzuvPnLSov71PsJX2QiRC6qaCUiSiwaSkv7VVw/uDxX9ase/d35XopBEYNAghcqI1E4yZjBev2Hdi5Yf/+VTsPHViW9LyVr+/bBReOlpX2jZDhqkE9elSN7V06eVxJcYQijEIj+QDIsNEugk21YQrT/u8Xv7DwAzNnjPSbmwLDxpH2jsbddPhK5FhC5ZRJH8A9AKqr5e8KbCIgEA+RaI5NOxGz9OWtrz2y4aV7f/zcc9/Fm6SJI441APAoAIzq0eP8m2fMrq4aMvrafcZxAagV25VkDWc7P9rvXHvdrz523rwP27aWgJQcpe4FmhShoZZOy+iB5UM+f03NZUT0WH11tTmZ1Od7CGyCBKqxeI7uPNxmvv/ckw9899mlnwLQTCBI/f2moaHB5PXpQ3uamwkAmgsKtGz3br3mwQe9jQcPPnnr448+WYhHvzVt6NCpAHzqZGAlkUjwnXfeKUSE79908w9vueTya5wgGfjWOkSnJrfCSvDIk7ycns6cEeNu/k/UP1pdX39Sqc/3DNgiVmPxfF25dx9//6k/fOwX69b9sp2GhKoqOFdfHViRo656XbzYqfnMZ/iW6mqZU1e3ddErr2w9wr475gpbnEiYOXVfDwDt99+f/ex3Pn3RRdc6Nh2kRR1iB84paKarbzJ5HPhtOmHgwDlTyssnE9GKkxkFSctuuPHpWQPLz0mnU8JE3B0SGDajC2dtdrZZ3tFUmXBYFxZAEHeidlNbi/nkL+753rN79nwp23ZTs6pVAEQ/PnXq+DETJkwe0Ld/T6tW/WTLhnsfeXTFoq1btwMhR23Rbbc5v37sMVq4fHnwV8CmRCJBVQDP/fodgahg0pihwz5/Wc3vPza3aihSLYEv1gHiYNhsk/zutk1CsBkBLCNwY8XOTx/77Tdu+OEPv7p48WJnzpw5wd8M7CPBFArBJigstbfiOBE1JvCMAzcQqLHiOTH++K/vXfbghk1nv7hggTt14ULLRCKqqPvo9VfOmFBx25i+fSb0LyoCHBcgIPAyeP3A4date/c9dM/jjz54z+Kn/4iQbw5mhrXWoLHxLXrRzJ0byJstLAu/cf31//yhynNvGjWgvIdta7aiat7NsRBWRKK5ebxu+/a1Y2+48SxVTVP7FNu/hRo/kv5AZLPzNQmOhPncEykzsRx2QbawEosW0N2rX9jy4IZNF2V7odmsROc9fOedd15QUXFrTjwOBFaCwFP4vmbVIQ0uKcob3L/0Y+MG9P9YTdUF6xpXrly2cse2H//pxRfXEZF3tHVWfdZZoz48r/KSsYOHf3JsWfkoQJBpPizGsHm3538wESOTskN6l42tu/pjFxLRw4lEwqmrqwvedbBJjxj7QISIBzhsOuZsdNmRPWIzJVHEolF5vanJ+d8lz/yAiFqmTp3q1tfXCxHZ//2HW39yxexZVyN1wPPaDjjEccYRljGJIuNZpUxSeufk4JLZUyounjmu4pXdBz61c+++HZkgePHAwUN7Lpl57vPPrlk+0s2JDo5FopPKinqMGFJaakCATbcFnooxDnO3b85Ex+0HQ0TwrCCeF9fpFSNvBPCb2tparaur+xsaaAQENkCyuADclkFOICC2sKSgoyRuQkUUMiuPNhqJQFArirhjfvvKusN/2bPnIVWlhTfeiJqaGvuVmqtuvGZe5dVobfGSliLGicOIviVrwKFVSwoY3waQZl+MYRlW2MMZ1qfPQDAPzAaxb7lw5uxsE3MBMh6CdCqwoRZxImpAqsfXUJpdaBS2/DoekBoEoM5FWA28NhlWVvaByuFjxhPRqmqgyyMq+ORVOIEZ8DwfmDQNhTffDPfCDyCZbZRj5J3ryQjgC5CKRBBYe9Sm9SyAMWIlUNq67+DdBLyx8MYbnQV33RUAGHjB5CmJeG5c0l7GjagJp/nSW7WIEiAksCxQAhxymK1xPLGaaWsTr7Ul8JtbAr+1OfCSzUGmtSXItLSJ7wWqIMcBsyMhSy+go333sIEQKUPIgR+NwXNdWB+gtJ8dMqPhiMlsB2VLgLGAZRden74QdnA8zJgIXpCRoeUDcNWcOTcAQP0JcNT45FS4ImAFBRYcy0Os8hxwXgHi06aAywZAfIu3CzURIfAD2EnjkXPTAvgjRkB8H2/fC1UBN2Kwu6UFz6zesFMBenbTJkNEesvFF4+eNGxkGVJpNcYQsqOj9ChbQegdhJkoJQthH0wgQ8wMdojYIbDDIMeAHMPExKAwE6UQzqZK/6rdnP0gY2D69YM5ayrMnFmQcWORdooQtHcW6djOCGkoaORQ5M6aDYwZCSvAcW0BIYZaTBo18ioAPRAyWendAxvZL2IVbiwHNi+OwAbwDSFa0AsIGPbtnRZU4cUcOLPOApeUwp0+DZbeWTAgpAC5Zltzk/9S04FGADp5/HgFgPHDRpxbmJev4gcnQI3tPgOrPQcNUiDwYV/dhmD1JqT37Af16Y3o7KmQ0p6wIkC2s5QrCnJdmL6lCABoWV8YJw6VY7twjjJLJh1MHjq49z9ecvmlVFcniUTCvItqPBv7Z0LgpWG8AGwMHCX4qWYQC/jtoq0KkAGTASvgOBGADd4emlCoAIasyI4UsIKJMXvsWAGAicNGRJFtr/G3PFjDll9KYf9VhyyclgOIrt0E/0/PwFu7Bm7EZPfl9s1K4VgBBeHDd6xCIR1r8K/WjTBDfJ/jeVGdNn7MFwD0rK2t7RIB44TBVgBWBQYMGIZNtcJ7YUUYBNm4Bf7OV4Eoh5GRI99nGE7aA298BQqBv2Ez2Ld4R3pQFVBGyrPt21bHUVSYLyBFcDrk7LJ6XCmci+IQgaNhlZKzdx/szl1hHCJr4AkzrPUQ7NoDVkWw+w1kJA2joXYL6OhkpqA9LZ9u0xmjRk+4YMyEoUQk1V2gV3XJGpfs5B0C4LkEiuYgaGoFOy6izMg8vQQHX3kZvO8AcjMB4BhYCmCOVLaicBxC6pmlkC0bobt2Iy/iQN/RXDh8j+u4grBvfcex++B+M7Ksz9+8jaXNkiJYwsiRUDgjpaOnueuGo7FU35xIqAo2BplXtkD27gFamhCFE7aRgoahb5F3yCurwHcVlMno4LL+Oq9q5k1/XL/6xfr6enTW9++ybCgBygSkMqBxoxCZPh2pjAeCIKqEnFe3ISfVAnZCi9o9SucqIiCWTiP66g7kBUe3xpVBQICI6xQB6CWq2PrGGwQAqze/3AZRuKdBOj4gwLoMEQb5BOEwikggsDDebo2oKhiKiATggwcQCQI4SvBcA58YbjIAO+8shjPCMOLAAzE0oHEDBnwcQCkz287iyF3WWFkV7jAjtWEn3AsugFtzBVKxOExbMyIOAEPwWOAbwB5l1QUGgFFEHALIhlPv3/Y6AhHgS0ks2nNMPH+WQtHQ0AAAeHXv7t/sa2kWww7r37AM21EKw7oOIMMHI9mrByiVhut5cMQDkx8ab/SWECPCXuuAy2G7zoA8RJJtYMvwR41EqqQfxL4tbUoEVgYZh+Al7Xljx+p3brhhlqqGdOZuB1uPCB64LuK7dyH51GLEp0xHfMENaDtrOppVYdM+XGFwB2H/7T60AZQRkELIwKgDBG+N/hklWOvLoIJCnT2mYpQCVByPq6ryfz744Ko1219Zj9w4i5UuZyK6a3SPT4ADgpv0kDnYgtxJU6DTp6Otdx+kKILAtxDfD7+bSNYOCTM85FtY30daBEGsCMHw0XAuqASK8+C8sQuG3qrvLAkIFo4QMoEgkpPDQ0rLvgbA1HaScWM+NWXqJwYUFQ4MgkC7VHapBBMR2O07YPv3R7S8HJHRFTDl/aBJH9h3GMikALIgE1pYRARlwIBgDcNYgDIZpEkQlJTASaWzLEuGUYM0icaiORwQDoxZs+qBF7//fUJDA77+9NM214nsnzF6bHV+LBqkJW2YGEbMW/xtgoYLCwZ+2ApKHII4CjLENhBSKLidDdrVsHfYQI/gEENb2+C3tSEyugLRIYNBvXpD84qgkQhgDIQZygRxDCSaCykuhpT1gzN8ONyKsXD79UPwxhvwV66Eyz6ONsiBSLNTvsEGavNikb7PrV3zzA23fv6V6upqs379ej01YCMcdk6qsC9vBw8rBxUUgHv2gkyqgI4YBInlwPMCmGQagWdhgwCBtbBWwJ6PwCXYfoMQveACaGsLnN17oW74FEkJlsARiG0JgvF/WL1qRX9rt3zmRz/iV+vr6dJvfGNDaWFRz2njJ8yIqgbw0uo5REaZGOFeSUrwKFBlKzGOsBvPY2biVhFyHJed3Fw27NmM9cghp8uZ2PbR20qAMQTT3AR/x3ZoQS5MSSlMr57g/v1BAwaCygfBDBoMHjwEzuDBwKCBcPr0hVNQCA0EbS+9BLtpPXKgIJh3aMT2gIxSNqQe+FJcUsKeOP7jf37+t+vWreO643R/OqnYOFuCOAynZS/8X9TDua4abr8BiPgGUj4UVD4UOZk0goN7kNl7AOZQMyJpH9YlSH4h3H594PQbgPTTz8Fu2AzjuoDYkDHKFnFRBH4KU/r3w3XTZny1pqHhUYcZVFPTPhz2nyI5OU2XT5/2/8p7lyDuJyGeFdaw8bEa48TdGIGMefX1Hd6abTueOphpe/D15qZXekaj/Qsi0esvnDh+bklhETKZDMxJTI1WBch14CZbESx7AVq+FzSkHKaoGMYxgPPW+IcA0FQbvB274L+2DW7zYUQ5BNR2gkATqBoTWJ3Qf8C1AG5j5jdwnFKhk5Jsy+GgcY0QKJlCeu0mBHkuIv1KYShsGqmOA5NfhEifMjiDBkGGDYU7ZAjcfv0gBYUIHnsSePL3iEaccDVn/c2wLM7AAmw00KHlA0uXb93ivdbcsipRWSlzPvEJZebg8eefe+pApvWPERMpcdXtG4/GYq4bYwXzvpYWrHttx/4n/rLy3m8+8tB13/z1r37wm2XPrmh8cflrjz//lzUPL3v2nuZDqR1TJk+eXZDjxvwgwMm1ECCAIzAQ4NA+0PbtSB/YB7+1GdrWDG1tgRw+BPvGLgSvvgy7aQPM9u2IemkYh97sGduJzhRETCbwbVlprwiTWd+4Zs2qRCJhlixZIqeEvEAQCAlI3NDUEx+BL/CHj0BkxgxEhpSD4rngI25dAGjaQ2brJmDxYjiv7oDmxUESNsNzLHXEnH124IjARwo5OT3kifXrufr/fnldG9H//cPQodEfvvyyp/X1nJ3ZiTElJX2uqJo7ZcSQYcUHDh3G6pfXb77nqadeAXAg6/ZwY20tNzY2AlVVqK2tBREF3/7Edf/0j9XV36MgCFTUMXpiOfjQ+JPsNCOGhQMOAqgGCBgdtYSiBFfDRj/W5VArZHu3EwAjAuHjlPEroLDWLcg3jz+78i+X3Pb/ph+v29LJgZ2lDtGRjXRIgVQAz7jIlPaAU9YHkeKe0KgDBAIcbIXueA12325EFeBIBLA4Zl80BUA2kEhBgTy4fsvrH73nZx9JA885zJgt4vSurtb6+nqlo0wCIiKICNfW1mL9+vVUX18vzKzZtGqWY1aXs/pH/7Nx/JABZZlUWhwwK51oKZh27K/t/jZ1NCXScI8/IsWrfy3n0BkfH6IximG/n2q74Wf/ddYjjz+94VgctW7noAkpiEKGivoWsD5UvY6vwUSwbgRwI+E6ttJRF3W86J2I1ZxYMT204SX57lN/+Obzu/bUAggcZjx5zjlOI4Bdra1UNmRIeLW9e2VXaytdc2mezrvjLRNzCwA0Z6WdmFkfvu32xg/OmVWZbmqxESETZrtO3w4k1J4sEg7cvHzn54se/59Pfvs/bjkWR63b2aWuhHO2PRY4EQUhAsu5Ya9SAtIMGLFht4FwOGanljErQGzIT+6VD1eMwpj+/b/6m5fWT/rZM0vu2dx86OE5S5Z0UIxoxYqOaBUALFwe/n5uxej511dM/hefjXzqvnumE1GwfOFCR1WD0pKSP0NQ+Raqy2l+GAEyJOz6GZ05bMwlAHKrqqqSf005dDvYNssmdTQMqAgAx3oQCof+xGy7oqM3w6+dfbhKsG6Mg2QbRsXjdtTZsy++ZOjgi1fs2PGX1Qf3PvyXnTufe+bll3cewXzRswcPnjy5rPSyy0eNHzG0d8/pg0pL8cLGjbvCXN2bV24+cFgglCUZKE5vuQ6fKxEQUbAN2oKhfcvKE9ddfx0R3ZXdmoJTDnY2JwCTZXhodipf+w5ojqAVdNU+ICg8MGJgeH7GBLZVxpYU6Ni+U87yfHvWtpYm7G5pkdZ0mhjQglgO+hXmc3l+LkAGSKcCaW3hQ+mUbd/PO+6bj1A02bJb7ZbnkV3aStnvEPr/4QSG9ljeiS0rzTJ5PVWKRSM6Z8K4j9b9Ej+uqq0VHIWj1u1gt9OGbQd/WN/y+xO2crPvi4iEbSmI4CDKac8CmRZxmWV4TtwMz8/jbCiMoApYsTblqUfCCqIccrg5adsAaGAtLV+4MDR2OobLUXY4nXZL07D2ZIjizdEVIAl54YqO0VddfS7tDJkwE+kapJI6prz/1FvnXzGaiDZUV1e/o53ne66K8+0UByYCM3MAOGlrKe15mspkNJXJaNrzNGMDIwTHELMDKAyhDcFKAH5jba2ZMmLEKc2kKCl8WA04sArfsmQsW9+S9ZVEIJTtqXIyxhoBQRDYkuJe0ekDhn8JAOqP0nznfdNAh95Uy3RU100BYoIvPra1NS9/NxalikiECW5OhOE4BmrQUSYT+ICX1jQCAdg4J2khWFXjBGmdMGTYZaW5ub0B7Hu7oebQCe6h7y1dENoMUcfQ9qbD+szKlWsA4Ed1dVpVVdXtdpiI1YgTEeTlm2RLEq9t3XnAN7z81Z1v+ApCQY+CwmInOmZon9IehUWFBsmkeJ5PbMwJ34thQ4GftCMH9uv11fmf+CAR/fTthprDElEgAMHi/dcpi0DkQzUKD9CoQ+aF1/cmn9y1ayUToSE027sF7HbjyxOrsbw4tbRmzO8WLVm7ruXAV+787x8vxTtLiovqFiyYNLxn79vPmzSmqrSwGEFrUsQhDkdjUpcXta9APBLRUcPKbwLwk6raWou6ug7p5p1Nh02YdKT3p1SrAwUjrp6FNVi5f8+vAOyz999v0I2diJQAK4HE8nNpw679B7/3+GNXX/Otf51553//+DECmrS+3qhq+0lEdDixcOHia79555zb7/3lh1a/un2nk5fLFr4YObFpsq6wkUxKxw0fPGHB3LkziQhHctR4TdOeVtH38XwrdaBi1Yk4ZtO+A5k/vLbxm0RAbU1Nt+5dVlXc/Dysfe3V/V/6wQ8v+Pr/3n2/Y0yrJhKsAFFNjSWi9lNVleqrq42q8sLfPPHI/C99ce6ytS/tiEcLOaNyQmOYGAzr+9KnZ5H5wKyZnwCg9bfc0nElbm5u/b/D6bQaNu/TnVtg4FtE8vDIK1sWvbhl+1a5v950R7d+zvrlVlVNxMHOAwf5m7+879O/W7FieX0iEQmspezgmaM9Wq1paLBEJInq6simlpZNX73rJ9ds2v5GEMuNib6TgXn8WDkRSGCQSergfmXXDIgWDEVVlc3eJvjXf35x+eq9+8CRCJNYWGIoEYy+d4fjhD59dowzfHVzc7H8tdfpx4uf+oGqUk1NTTdtEmFND5OKE8nhP73w4s9/tXTpb1686y63pq7O66zlW9fQ4L14113uks2bn3lq89rbhIxxQF1GW0mhRgnptB07cEje1z93yywi0sZsMQHvhrf1mZdf20SOqwH7ErEEVYK8RzW7OSKo45MgAmN9n53/en7pPa8lk39EbS11tSDuWPu0QOE6Du/c8YZ395Kl/6qq9O1Fi7osKVNvvDFQVar7470/3Lpzxz6OxYxK1/A2KhAGAlVyOaJDBva/GYCpCosJwARkntm48SuvHjxMUSemqgEcAXym96jSJvisMCKIBDbgnCLnnuUvLLt79eobtL7edOfgNgIgCkE8Tiu2vfza4uXLtwFAQ0ODnJCiAGjPmj1tK7ZuXYlIBEdL2R4TbDEw1kHAxiDTqqN69Zz5uUsvnExEUl9dbVjq680fd2175FdrXlpkIoUmFdFACXDtexNsy6Ef5Hhqnfxezn3rVu3/9G8fvt4we1mjrNvAVgBELFCDQ+nkYgUsGhvNiX5GYzirjCJ5hQ/BWnAXxz4JKxgEAwPf+tq7Z0+dNmb8PwFhO2uuqamBqtL3fv+7f/rtxpda86P5JoWgg9pPOJ2zP9oxHjmcZqNgEZhAAi4qNg9uXLfvi/X3z2OiVz4sYrp7hJICIGbAs4jHc9cQoI2NjSd8vX0VFQpAX3n51eYgnQExdwltSwKhAI4QVMkg8LWif/lVA3JzK5jZcgNga2trqYlozX8u+sP1K3bv9gvieZqxVgCGkGSbzZ1+oBMkzBypAQvB14xGHPiRnGLnF6tX7r/1gV/O2xkEq88591ynu/bpt4RnET4bAOhbWtJ8stdclx2PuW3H68OzFV9dkuwwqUIQlpAfnUnLhJFDzFdu+tRsaLbsuK6uTm6YPNldvHP3Q//y6ENfenHXLpOTXwSy1sICQgYZdkLK5mm1P7uAuiDxVSA2Hu9BLYi5P1j2zNKP3/erqp3JYE3luec6S5YsCbpfp4T2PlSBqIPNr7x2nqpS1Uk0v21/Z0nPnn1MLAYrcsItSgDAE2E2BkNL+t2qQKwjurJw+XJ/wZQp7pNbt//g8w/dP/8361YFbkGOiboGru9btp6eLjH0sDmtwoqIgQ3cmKFoTtw0vvyqt+Dee39+6+O//QARratWNZ0FWk9kLKISxIqBBuiRk3MBEblm7tzOTIw+OthhZUd02IA+k2BM+zyyk/BBiZFq0wnlA8d8ZM6cc99ysYXLl/uaSPCyN/bUX3Hvr6Z/7U9PLd3ckoHJKzSx3CgZIiXAqoiIKERUVUVOySlH+beIQFWiTDYWiSAnP86IxJw/v3Gote7JRXfP+fnCKfdt2fBJw5xSVe6K6mZVgzCSIaIq2olTACFiRSoZnD18dEl1ZeUYEUH1CUwpSCQSTETap0fekHHl5TOQSobErU7ey9FOqIrvZ6S0uFDmjB//zXdkPqiuTqqrq03DAw+s+tcnF81d+dq2issmT/r8xF5lHxhemN+nOBYzriFk+yBRWNJ5isUY4UeBCBII9ns+Nu/djd2H9//5qS1bF//3iy/+F4CdIEL9VVeZmtD16ZQx1m5OtahtQ04OuzaIgEOD+vg5qOwLrM89hwzCjZdf+s8NS5Zc25Uy2g6prqriuro6+bfPfuGmseMnAc2HOJqbd/LOgwRAThzl/fsPOWqaK8twYMPsP75ly6rHt2z5OIDSf66qmjigZ8/zjR/MiaqOKC0o3FWYk7f7VEyHFT4SLUJTWzNea2vF1td3YVdzy9N/3Ly+sQl4qh1Ura83tTU1XR5LXDVnjlWAapYsu1sy/jmjS3tHk1aUlLOldXS0lZf1azUbpoTE4zv58KEmr8Oc6KoKb2wUAGhKpXjJ88+vdYgOMht651DUd97H0V6jKgQibWprK25qaSvYuH/XP/5/P3FhtEfnBaIAAAAASUVORK5CYII=";

// ============================================================
// 검단ABA 언어행동연구소 AAC maker — 개선 버전
// 핵심 개선: 그림 업로드 즉시 그 옆에서 라벨 입력
// 그리드 미리보기 + 라벨 위치/크기/스타일 조절 + PDF 출력
// 로그인 시스템: 관리자가 선생님 계정 등록/관리
// ============================================================

// ─────────────────────────────────────────────────────────────
// 디버그 로그 토글
// ─────────────────────────────────────────────────────────────
// 평소(false): 콘솔에 아무것도 출력 안 함. 동료 BCBA가 콘솔 열어볼 일 없으므로 깨끗하게 유지
// 문제 신고받을 때: 본인이 이 값을 true로 바꿔 재배포하면 모든 내부 동작 로그가 콘솔에 표시됨
// safeAlert로 사용자에게 알리는 진짜 중요한 에러는 콘솔과 별개로 항상 표시됨
const DEBUG = false;
const devLog = (...args) => { if (DEBUG) console.log(...args); };
const devWarn = (...args) => { if (DEBUG) console.warn(...args); };
const devError = (...args) => { if (DEBUG) console.error(...args); };
const devInfo = (...args) => { if (DEBUG) console.info(...args); };

// =====================================================================
// Supabase 연결 설정 (A방식: Supabase Auth + RLS)
// anon/URL은 빌드 시 GitHub Secrets → Vite env 로 주입 (소스에 비번/키 하드코딩 없음)
// =====================================================================
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// =====================================================================
// Auth 세션 관리 (Supabase Auth) — sessionStorage 기반 (탭 닫으면 로그아웃)
// =====================================================================
const AUTH_SESSION_KEY = 'sb-auth-session';

function getStoredSession() {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    // 만료 확인 (5분 여유 → refresh 필요 판단)
    if (s.expires_at && s.expires_at * 1000 < Date.now() + 5 * 60 * 1000) return null;
    return s;
  } catch (e) { return null; }
}

function saveSession(session) {
  try {
    if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(AUTH_SESSION_KEY);
    // 과거 localStorage 자동로그인 흔적 제거 (보안)
    localStorage.removeItem(AUTH_SESSION_KEY);
  } catch (e) {}
}

async function refreshSession(refreshToken) {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    if (data.access_token) { saveSession(data); return data; }
    return null;
  } catch (e) { return null; }
}

async function getValidAccessToken() {
  let session = getStoredSession();
  if (session?.access_token) return session.access_token;
  const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (raw) {
    try {
      const old = JSON.parse(raw);
      if (old.refresh_token) {
        const refreshed = await refreshSession(old.refresh_token);
        if (refreshed?.access_token) return refreshed.access_token;
      }
    } catch (e) {}
  }
  return null;
}

async function authHeaders() {
  const token = await getValidAccessToken();
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
}

// =====================================================================
// Storage API (Private 버킷 aac-cards) — aac-storage Edge Function 경유
//  - 이미지 바이너리는 Storage에, aac_data 행에는 경로만.
//  - 서명 URL 발급/업로드/삭제 전부 서버(service_role)에서. 남의 경로는 서버가 거부.
// =====================================================================
const AAC_STORAGE_FN = () => `${SUPABASE_URL}/functions/v1/aac-storage`;

// data URL / base64 문자열에서 contentType 추정
function _guessContentType(dataUrl) {
  if (typeof dataUrl === 'string') {
    const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
    if (m) return m[1];
  }
  return 'image/jpeg';
}

// 카드 이미지 1개 업로드. kind: '' (표시용) | 'orig' (원본).
// 성공 시 저장 경로(string) 반환, 실패 시 null.
async function storageUpload(cardId, dataUrl, kind = '') {
  try {
    if (!dataUrl || typeof dataUrl !== 'string') return null;
    const headers = await authHeaders();
    const r = await fetch(AAC_STORAGE_FN(), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        action: 'upload',
        cardId,
        kind,
        contentType: _guessContentType(dataUrl),
        base64: dataUrl, // Edge Function이 data: 접두 제거 처리
      }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.path || null;
  } catch (e) { devWarn('storageUpload 실패:', e); return null; }
}

// 경로 배열 → 서명 URL 맵 { path: url|null }. 남의 경로/에러는 null.
async function storageSign(paths) {
  const out = {};
  const list = (paths || []).filter(Boolean);
  if (!list.length) return out;
  try {
    const headers = await authHeaders();
    const r = await fetch(AAC_STORAGE_FN(), {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: 'sign', paths: list }),
    });
    if (!r.ok) return out;
    const j = await r.json();
    for (const it of (j?.urls || [])) out[it.path] = it.url || null;
    return out;
  } catch (e) { devWarn('storageSign 실패:', e); return out; }
}

// 경로 배열 삭제 (본인 것만 서버가 처리).
async function storageRemove(paths) {
  const list = (paths || []).filter(Boolean);
  if (!list.length) return true;
  try {
    const headers = await authHeaders();
    const r = await fetch(AAC_STORAGE_FN(), {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: 'remove', paths: list }),
    });
    return r.ok;
  } catch (e) { devWarn('storageRemove 실패:', e); return false; }
}

// ── 서명 URL 세션 캐시 ──────────────────────────────
// 만료 1시간(SIGN_TTL)보다 짧게(50분) 캐시해서 만료 전 재발급.
const _signedUrlCache = new Map(); // path -> { url, exp }
const _SIGNED_TTL_MS = 50 * 60 * 1000;

// 경로 배열 → { path: url } 맵. 캐시에 없는 것만 서버에서 일괄 발급.
async function resolveSignedUrls(paths) {
  const now = Date.now();
  const want = [...new Set((paths || []).filter(Boolean))];
  const result = {};
  const missing = [];
  for (const p of want) {
    const hit = _signedUrlCache.get(p);
    if (hit && hit.exp > now && hit.url) result[p] = hit.url;
    else missing.push(p);
  }
  if (missing.length) {
    const signed = await storageSign(missing);
    for (const p of missing) {
      const url = signed[p] || null;
      if (url) {
        _signedUrlCache.set(p, { url, exp: now + _SIGNED_TTL_MS });
        result[p] = url;
      }
    }
  }
  return result;
}


// =====================================================================
// Auth API
// =====================================================================
async function signInWithPassword(email, password) {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json();
    if (!r.ok) return { error: data.error_description || data.msg || data.error || '로그인 실패' };
    saveSession(data);
    return { session: data, user: data.user };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function signOutAuth() {
  try {
    const token = await getValidAccessToken();
    if (token) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${token}` },
      });
    }
  } catch (e) {}
  saveSession(null);
}

async function getCurrentAuthUser() {
  try {
    const token = await getValidAccessToken();
    if (!token) return null;
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${token}` },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

// 관리자 여부 (is_admin() RPC — 공유 인프라)
async function checkIsAdmin() {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/is_admin`, {
      method: 'POST', headers, body: '{}',
    });
    if (!r.ok) return false;
    return (await r.json()) === true;
  } catch (e) { return false; }
}

// =====================================================================
// 관리자용 사용자 관리 (admin-users Edge Function + admin_list_users RPC — 공유 인프라)
// =====================================================================
async function adminCreateUser(email, password, displayName) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'create', email, password, display_name: displayName || email.split('@')[0] }),
    });
    const data = await r.json();
    if (!r.ok) return { error: data.error || '계정 생성 실패' };
    return { user: data.user };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function adminDeleteUser(userId) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'delete', user_id: userId }),
    });
    if (!r.ok) { const data = await r.json().catch(() => ({})); return { error: data.error || '삭제 실패' }; }
    return { ok: true };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function adminUpdateUserPassword(userId, newPassword) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'update_password', user_id: userId, password: newPassword }),
    });
    const data = await r.json();
    if (!r.ok) return { error: data.error || '비번 변경 실패' };
    return { ok: true };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function adminListUsers() {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_list_users`, {
      method: 'POST', headers, body: '{}',
    });
    if (!r.ok) return [];
    return await r.json();
  } catch (e) { return []; }
}

// 관리자용: 특정 유저의 aac_data 전체 조회 (admin_get_aac_data RPC)
async function adminGetAacData(userId) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_get_aac_data`, {
      method: 'POST', headers,
      body: JSON.stringify({ target_user_id: userId }),
    });
    if (!r.ok) return [];
    return await r.json();
  } catch (e) { return []; }
}

// =====================================================================
// 데이터 저장/조회 (aac_data 테이블 — RLS로 본인 데이터만 접근)
// 스키마: (user_id uuid, key text, value text, updated_at) — SCERTS v2 scerts_data 동일
// =====================================================================
async function dataGet(key, userIdOverride) {
  try {
    const headers = await authHeaders();
    let uid = userIdOverride;
    if (!uid) { const u = await getCurrentAuthUser(); uid = u?.id; }
    if (!uid) return null;
    const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${uid}&key=eq.${encodeURIComponent(key)}&select=key,value`;
    const r = await fetch(url, { headers });
    if (!r.ok) return null;
    const rows = await r.json();
    if (rows && rows.length > 0) return { key: rows[0].key, value: rows[0].value };
    return null;
  } catch (e) { return null; }
}

async function dataSet(key, value) {
  try {
    const headers = await authHeaders();
    const u = await getCurrentAuthUser();
    if (!u?.id) return null;
    const r = await fetch(`${SUPABASE_URL}/rest/v1/aac_data?on_conflict=user_id,key`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ user_id: u.id, key, value, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    return { key, value };
  } catch (e) { return null; }
}

async function dataDelete(key) {
  try {
    const headers = await authHeaders();
    const u = await getCurrentAuthUser();
    if (!u?.id) return null;
    const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${u.id}&key=eq.${encodeURIComponent(key)}`;
    await fetch(url, { method: 'DELETE', headers });
    return { key, deleted: true };
  } catch (e) { return null; }
}

async function dataList(prefix, userIdOverride) {
  try {
    const headers = await authHeaders();
    let uid = userIdOverride;
    if (!uid) { const u = await getCurrentAuthUser(); uid = u?.id; }
    if (!uid) return { keys: [], rows: [] };
    const filter = prefix ? `&key=like.${encodeURIComponent(prefix)}*` : '';
    // 응답이 크면(이미지 base64 다수) 한 번에 받다가 실패하므로, limit/offset으로 나눠 받음
    const PAGE = 150;
    let all = [];
    let offset = 0;
    for (let guard = 0; guard < 200; guard++) {
      const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${uid}&select=key,value${filter}&order=key.asc&limit=${PAGE}&offset=${offset}`;
      const r = await fetch(url, { headers });
      if (!r.ok) {
        if (offset === 0) return { keys: [], rows: [], _error: true };
        break;
      }
      const rows = await r.json();
      if (!Array.isArray(rows) || rows.length === 0) break;
      all = all.concat(rows);
      if (rows.length < PAGE) break; // 마지막 페이지
      offset += PAGE;
    }
    return { keys: all.map((row) => row.key), rows: all };
  } catch (e) {
    return { keys: [], rows: [], _error: true };
  }
}

// 히스토리: 인덱스 + 개별 묶음 분리 저장
const HISTORY_INDEX_KEY = 'aac_history_index';
const HISTORY_ITEM_PREFIX = 'aac_history_item:';
const CATEGORIES_KEY = 'aac_categories';
// ───── 라이브러리(영구 보관) 저장 키 ─────
// 카테고리별로 분리 저장: aac_library:{categoryId}  (카테고리 없음 = __none__)
// 각 값 = JSON 배열 [{ id, image, originalImage, label, categoryId }]
const LIBRARY_PREFIX = 'aac_library:';   // (구) 카테고리 통째 저장 — 로드 호환용으로만 사용
const LIBRARY_NONE = '__none__';
const LIBRARY_KEY = (categoryId) => `${LIBRARY_PREFIX}${categoryId || LIBRARY_NONE}`;
// (신) 카드 1장 = 1행 저장. 값이 작아 크기 초과 없음.
const LIBCARD_PREFIX = 'aac_libcard:';
const LIBCARD_KEY = (cardId) => `${LIBCARD_PREFIX}${cardId}`;
const DRAFT_KEY_PREFIX = 'aac_draft:'; // 작업 중 카드 자동 저장 (사용자별, localStorage만)
const SESSION_HOURS = 24; // 로그인 유효 시간

// ───── 통합 저장소 (window.storage 우선, localStorage 폴백) ─────
// window.storage가 있으면 공유 저장소로 사용 (모든 사용자 동기화)
// 서버 오류 / rate limit 시 자동으로 localStorage로 폴백
let hasClaudeStorage = typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function';

// rate limit 감지 - 한 번 걸리면 그 세션 동안은 window.storage 안 씀
let rateLimitHit = false;
const isRateLimitError = (e) => {
  const msg = (e?.message || e?.toString() || '').toLowerCase();
  return msg.includes('rate limit') || msg.includes('429');
};
const disableSharedStorage = () => {
  if (rateLimitHit) return;
  rateLimitHit = true;
  hasClaudeStorage = false;
  devWarn('🔴 Rate limit 감지 - 이 세션은 localStorage만 사용합니다');
};

const store = {
  // 데이터 읽기
  // localStorage를 우선 - 항상 최신 (모든 set은 localStorage 즉시 + window.storage 시도)
  // window.storage가 실패할 수 있어서 localStorage가 더 신뢰 가능
  async get(key, shared = false) {
    // 1) localStorage 먼저 확인 - 최신 상태 보장
    try {
      const local = localStorage.getItem(key);
      if (local !== null) return local;
    } catch {}
    // 2) localStorage에 없으면 window.storage에서 가져오기 (첫 사용 또는 다른 기기 데이터)
    if (hasClaudeStorage) {
      try {
        const result = await window.storage.get(key, shared);
        if (result?.value !== undefined && result?.value !== null) {
          // 가져온 값을 localStorage에 캐싱
          try { localStorage.setItem(key, result.value); } catch {}
          return result.value;
        }
      } catch (e) {
        if (isRateLimitError(e)) disableSharedStorage();
      }
    }
    return null;
  },

  // 데이터 쓰기
  async set(key, value, shared = false) {
    // localStorage에는 무조건 즉시 저장 (백업)
    try { localStorage.setItem(key, value); } catch {}
    if (hasClaudeStorage) {
      try {
        await window.storage.set(key, value, shared);
        return true;
      } catch (e) {
        if (isRateLimitError(e)) disableSharedStorage();
        // localStorage엔 이미 저장됐으니 OK
        return true;
      }
    }
    return true;
  },

  async delete(key, shared = false) {
    try { localStorage.removeItem(key); } catch {}
    if (hasClaudeStorage) {
      try {
        await window.storage.delete(key, shared);
      } catch (e) {
        if (isRateLimitError(e)) disableSharedStorage();
      }
    }
    return true;
  },
};

// JSON 헬퍼
const storeGetJSON = async (key, shared = false, fallback = null) => {
  const raw = await store.get(key, shared);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const storeSetJSON = (key, value, shared = false) => store.set(key, JSON.stringify(value), shared);

// ───── 디바운싱 저장 (rate limit 회피) ─────
// 같은 키에 짧은 시간 안에 여러 번 저장 시도가 들어오면 마지막 것만 저장
const debouncedTimers = new Map();
const DEBOUNCE_MS = 800; // 800ms 동안 변경 없으면 저장

const debouncedStoreSet = (key, value, shared = false) => {
  // localStorage에는 즉시 백업 (rate limit과 무관)
  try { localStorage.setItem(key, value); } catch {}
  // 기존 타이머 취소
  if (debouncedTimers.has(key)) {
    clearTimeout(debouncedTimers.get(key));
  }
  // 새 타이머 설정 - 일정 시간 후 한 번만 저장
  const timer = setTimeout(() => {
    debouncedTimers.delete(key);
    store.set(key, value, shared).catch(e => devWarn('디바운스 저장 실패:', key, e));
  }, DEBOUNCE_MS);
  debouncedTimers.set(key, timer);
};

const debouncedStoreSetJSON = (key, value, shared = false) => debouncedStoreSet(key, JSON.stringify(value), shared);

// ───── 히스토리 전용 저장 헬퍼 (인덱스 + 개별 항목 분리) ─────
// 인덱스는 메타 정보만 (가벼움) - 카드 이미지는 포함 안 함
// 카드 본문은 'aac_history_item:<id>' 키에 따로 저장

// 잠금 메커니즘은 제거됨 (rate limit 회피용) - no-op 함수 유지로 기존 호출 호환
const acquireHistoryLock = async () => true;
const releaseHistoryLock = async () => {};

// 인덱스 = 메타 정보만 ({id, ownerUsername, ownerName, name, date, timestamp, sizeMm, labelPos, cardCount, thumbnails})
// 본문 = 카드 배열 + 설정
const summarizeForIndex = (snapshot) => ({
  id: snapshot.id,
  name: snapshot.name,
  date: snapshot.date,
  timestamp: snapshot.timestamp,
  ownerUsername: snapshot.ownerUsername,
  ownerName: snapshot.ownerName,
  sizeMm: snapshot.sizeMm,
  labelPos: snapshot.labelPos,
  fontId: snapshot.fontId,
  labelSize: snapshot.labelSize,
  cardCount: snapshot.cards?.length || 0,
  // 미리보기용 썸네일 (최대 4장만, 인덱스 가볍게 유지)
  thumbnails: (snapshot.cards || []).slice(0, 4).map(c => c.image).filter(Boolean),
});

// ─────────────────────────────────────────────────────────────
// 히스토리 저장 모델 (A방식 · aac_data)
//   key   = 'aac_history_item:<id>'
//   value = JSON { id, title, cards, sizeMm, labelPos, fontId, labelSize,
//                  categoryId, ownerName, createdAt, timestamp }
//   RLS가 본인(user_id) 것만 반환 → 별도 인덱스 키/owner 필터 불필요
//   관리자가 특정 선생님 것을 볼 때만 admin_get_aac_data(target) 사용
// ─────────────────────────────────────────────────────────────
const HISTORY_INDEX_PREFIX = 'aac_history_index:';
const HISTORY_KEY = (id) => `${HISTORY_ITEM_PREFIX}${id}`;
const HISTORY_IDX_KEY = (id) => `${HISTORY_INDEX_PREFIX}${id}`;

// 인덱스 payload(메타+썸네일)에서 UI stub 생성 — 전체 카드 없이 가벼움
const indexRowToStub = (key, value) => {
  let d = {};
  try { d = JSON.parse(value) || {}; } catch (e) { d = {}; }
  const id = d.id || key.slice(HISTORY_INDEX_PREFIX.length);
  const thumbs = Array.isArray(d.thumbnails) ? d.thumbnails.filter(Boolean) : [];
  return {
    id,
    ownerUsername: d.ownerUsername || '',
    ownerName: d.ownerName || '',
    title: d.title || d.name || '',
    name: d.title || d.name || '',
    date: d.createdAt || d.date || '',
    timestamp: d.timestamp || (d.createdAt ? new Date(d.createdAt).getTime() : 0),
    cardCount: d.cardCount != null ? d.cardCount : thumbs.length,
    sizeMm: d.sizeMm,
    labelPos: d.labelPos,
    fontId: d.fontId,
    labelSize: d.labelSize,
    categoryId: d.categoryId,
    thumbnails: thumbs,
    cards: thumbs.length ? [{ image: thumbs[0], label: '' }] : [],
    _isStub: true,
  };
};

// 인덱스 로드 (썸네일 stub). 인덱스 행(aac_history_index:)만 읽어 가벼움.
//  - 일반 선생님: 본인 것만 (RLS)
//  - 관리자: 모든 선생님의 인덱스를 admin_get_aac_data 로 수집 (owner별 폴더뷰용)
//  - auth._adminTargetId: 특정 선생님 하나만 (관리자 대리 조회)
const loadHistoryIndex = async (auth) => {
  if (!auth) return [];

  // 관리자: 전체 선생님 순회 수집
  if (auth.role === 'admin' && !auth._adminTargetId) {
    const users = await adminListUsers();
    const teachers = users || [];
    const collected = [];
    for (const t of teachers) {
      try {
        const rows = await adminGetAacData(t.user_id);
        const ownerLabel = t.email || '';
        const ownerName = t.display_name || (t.email ? t.email.split('@')[0] : '');
        (rows || [])
          .filter(r => r.key && r.key.startsWith(HISTORY_INDEX_PREFIX))
          .forEach(r => {
            const stub = indexRowToStub(r.key, r.value);
            stub.ownerUsername = ownerLabel; // 폴더 그룹핑 키(계정 기준)
            stub.ownerName = stub.ownerName || ownerName;
            stub._ownerId = t.user_id; // 본문 로드 시 admin_get_aac_data 대상
            collected.push(stub);
          });
      } catch (e) { /* 개별 선생님 실패는 건너뜀 */ }
    }
    return collected.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }

  // 특정 선생님 하나만 (관리자 대리 조회) 또는 일반 선생님 본인 것
  let rows = [];
  if (auth._adminTargetId) {
    const all = await adminGetAacData(auth._adminTargetId);
    rows = (all || []).filter(r => r.key && r.key.startsWith(HISTORY_INDEX_PREFIX));
  } else {
    const res = await dataList(HISTORY_INDEX_PREFIX);
    rows = res.rows || [];
  }
  return rows
    .map(r => indexRowToStub(r.key, r.value))
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
};

// 특정 묶음 본문 로드 (전체 카드) — 본문 행(aac_history_item:)만.
//  ownerId 지정(관리자가 특정 선생님 카드 열람) 시 admin_get_aac_data 로 조회
const loadHistoryItem = async (id, auth, ownerId) => {
  if (!auth) return null;
  let value = null;
  const targetId = ownerId || auth._adminTargetId;
  if (targetId && auth.role === 'admin') {
    const all = await adminGetAacData(targetId);
    const hit = (all || []).find(r => r.key === HISTORY_KEY(id));
    value = hit?.value || null;
  } else {
    const row = await dataGet(HISTORY_KEY(id));
    value = row?.value || null;
  }
  if (!value) { devWarn('getBundle 실패: 없음', id); return null; }
  try {
    const d = JSON.parse(value) || {};
    return { cards: d.cards || [] };
  } catch (e) { return { cards: [] }; }
};

// 묶음 추가/저장 (upsert) — 인덱스 행 + 본문 행 2개로 분리 저장
const addHistoryItem = async (snapshot, auth) => {
  if (!auth) return;
  if (auth._adminTargetId) return; // 관리자 대리 조회 모드에선 저장 안 함
  const now = new Date();
  const cards = snapshot.cards || [];
  const meta = {
    id: snapshot.id,
    title: snapshot.title || snapshot.name || '',
    sizeMm: snapshot.sizeMm,
    labelPos: snapshot.labelPos,
    fontId: snapshot.fontId,
    labelSize: snapshot.labelSize,
    categoryId: snapshot.categoryId,
    ownerUsername: auth.email || '',
    ownerName: auth.name || '',
    cardCount: cards.length,
    // 썸네일 최대 4장 (목록 미리보기용)
    thumbnails: cards.slice(0, 4).map(c => c.image).filter(Boolean),
    createdAt: snapshot.date || now.toISOString(),
    timestamp: snapshot.timestamp || now.getTime(),
  };
  // 본문: 전체 카드
  const body = { id: snapshot.id, cards };
  const r1 = await dataSet(HISTORY_KEY(snapshot.id), JSON.stringify(body));
  const r2 = await dataSet(HISTORY_IDX_KEY(snapshot.id), JSON.stringify(meta));
  if (!r1 || !r2) devWarn('saveBundle 실패:', snapshot.id);
};

// 묶음 삭제 — 인덱스 행 + 본문 행 둘 다 제거
const deleteHistoryItem = async (id, auth) => {
  if (!auth || auth._adminTargetId) return;
  const r1 = await dataDelete(HISTORY_KEY(id));
  const r2 = await dataDelete(HISTORY_IDX_KEY(id));
  if (!r1 && !r2) devWarn('deleteBundle 실패:', id);
};

// 묶음 메타 업데이트 (이름/카테고리 변경) — 인덱스 행만 갱신 (본문 카드는 그대로)
const updateHistoryMeta = async (id, updates, auth) => {
  if (!auth || auth._adminTargetId) return;
  const row = await dataGet(HISTORY_IDX_KEY(id));
  if (!row?.value) { devWarn('updateMeta: 인덱스 조회 실패'); return; }
  let d = {};
  try { d = JSON.parse(row.value) || {}; } catch (e) { return; }
  if (updates.title !== undefined) d.title = updates.title;
  else if (updates.name !== undefined) d.title = updates.name;
  if (updates.categoryId !== undefined) d.categoryId = updates.categoryId;
  const r = await dataSet(HISTORY_IDX_KEY(id), JSON.stringify(d));
  if (!r) devWarn('updateMeta 실패:', id);
};

// 묶음 순서 변경 - timestamp 기준 정렬. UI 즉시 반영만 (재저장 불필요).
const moveHistoryToTop = async (id, newDate, newTimestamp, auth) => {
  devLog('moveHistoryToTop: 클라이언트 UI 정렬만 처리');
};

// 전체 비우기 (본인 것만) — 인덱스+본문 행 모두 제거
const clearHistory = async (ownerFilter, auth) => {
  if (!auth || auth._adminTargetId) return;
  const idxRes = await dataList(HISTORY_INDEX_PREFIX);
  const itemRes = await dataList(HISTORY_ITEM_PREFIX);
  const keys = [...(idxRes.rows || []), ...(itemRes.rows || [])].map(r => r.key);
  await Promise.all(keys.map(k => dataDelete(k).catch(() => {})));
};

// ───── 라이브러리(영구 보관) 저장소 ─────
// 카드 1장 = aac_data 한 행(aac_libcard:{cardId}).
// 신규 값 = JSON { id, imagePath, originalPath, label, categoryId }  ← 이미지는 Storage 경로만
// (구버전 값 = { id, image(base64), originalImage(base64), ... } — 로드 시 호환 처리)

// 카드 한 장 저장. 이미지는 Storage(aac-cards)에 업로드하고 행에는 경로만 저장.
// 성공하면 true, 실패하면 false 반환 (호출부에서 사용자 알림).
const saveLibraryCard = async (card) => {
  // 이미 경로만 있는 카드(재저장)면 업로드 생략, 아니면 base64를 Storage로 올림.
  let imagePath = card.imagePath || null;
  let originalPath = card.originalPath || null;

  // 표시용 이미지: card.image 가 data URL 이면 업로드해서 경로 확보
  if (!imagePath && typeof card.image === 'string' && card.image.startsWith('data:')) {
    imagePath = await storageUpload(card.id, card.image, '');
    if (!imagePath) return false; // 업로드 실패 → 저장 실패로 처리(데이터 유실 방지)
  }
  // 원본 이미지(있을 때만)
  const origSrc = card.originalImage;
  if (!originalPath && typeof origSrc === 'string' && origSrc.startsWith('data:')) {
    originalPath = await storageUpload(card.id, origSrc, 'orig');
    // 원본 업로드 실패는 치명적이지 않음 → 경로 없이 진행
  }

  const body = {
    id: card.id,
    imagePath,
    originalPath,
    label: card.label || '',
    categoryId: card.categoryId || null,
  };
  const r = await dataSet(LIBCARD_KEY(card.id), JSON.stringify(body));
  return !!r;
};

// 여러 장 저장. { okCount, failCount, saved } 반환. saved=저장 성공한 카드 배열.
const saveLibraryCards = async (cards) => {
  let okCount = 0, failCount = 0;
  const saved = [];
  for (const c of (cards || [])) {
    const ok = await saveLibraryCard(c).catch(() => false);
    if (ok) { okCount++; saved.push(c); } else failCount++;
  }
  return { okCount, failCount, saved };
};

// 카드 한 장 삭제
const deleteLibraryCard = async (cardId) => {
  // DB 행을 지우기 전에 먼저 읽어 Storage 경로 확보 → 파일까지 삭제(고아 파일 방지)
  try {
    const row = await dataGet(LIBCARD_KEY(cardId));
    if (row?.value) {
      const c = JSON.parse(row.value);
      const paths = [];
      if (c?.imagePath) paths.push(c.imagePath);
      if (c?.originalPath) paths.push(c.originalPath);
      if (paths.length) await storageRemove(paths).catch(() => {});
    }
  } catch (e) { devWarn('Storage 파일 삭제 확인 실패(무시):', e); }
  return dataDelete(LIBCARD_KEY(cardId)).catch(() => null);
};

// 전체 라이브러리 로드 → { [categoryId or '__none__']: cards[] } 맵
// 신규(카드 단위) + 구버전(카테고리 통째) 둘 다 읽어 합침 (호환).
// aac_data에서 특정 prefix의 key만 가볍게 조회 (value 제외 → 타임아웃 회피)
async function dataListKeys(prefix, userIdOverride) {
  try {
    const headers = await authHeaders();
    let uid = userIdOverride;
    if (!uid) { const u = await getCurrentAuthUser(); uid = u?.id; }
    if (!uid) return { keys: [], _error: true };
    const filter = prefix ? `&key=like.${encodeURIComponent(prefix)}*` : '';
    const keys = [];
    const PAGE = 500; // key만이라 가벼움
    let offset = 0;
    for (let guard = 0; guard < 200; guard++) {
      const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${uid}&select=key${filter}&order=key.asc&limit=${PAGE}&offset=${offset}`;
      const r = await fetch(url, { headers });
      if (!r.ok) { if (offset === 0) return { keys: [], _error: true }; break; }
      const rows = await r.json();
      if (!Array.isArray(rows) || rows.length === 0) break;
      for (const row of rows) keys.push(row.key);
      if (rows.length < PAGE) break;
      offset += PAGE;
    }
    return { keys };
  } catch (e) { return { keys: [], _error: true }; }
}

const loadLibraryAll = async () => {
  const map = {}; // { catKey: cards[] }
  let hadError = false;
  const push = (catKey, card) => {
    if (!map[catKey]) map[catKey] = [];
    map[catKey].push(card);
  };
  const needSign = []; // 서명 필요한 카드 목록 (신규 경로 방식)

  // 신규: 카드 단위 행 — ★ key만 가볍게 조회 후, 본문은 한 장씩 개별로 읽어 타임아웃 회피
  try {
    const keyRes = await dataListKeys(LIBCARD_PREFIX);
    if (keyRes._error) hadError = true;
    for (const key of (keyRes.keys || [])) {
      let c = null;
      try {
        const row = await dataGet(key); // 한 장만 읽음 → 안전
        if (row?.value) c = JSON.parse(row.value);
      } catch { c = null; }
      if (!c) continue;
      if (c.imagePath) {
        push(c.categoryId || LIBRARY_NONE, c);
        needSign.push(c); // 나중에 서명 URL 채움
      } else if (c.image) {
        push(c.categoryId || LIBRARY_NONE, c); // 구버전(base64) 그대로
      }
    }
  } catch (e) { devWarn('라이브러리(카드) 로드 실패:', e); hadError = true; }

  // 구버전: 카테고리 통째 행 (있으면 흡수) — 소수라 통째 읽어도 무방
  try {
    const oldRes = await dataList(LIBRARY_PREFIX);
    for (const r of (oldRes.rows || [])) {
      const catKey = r.key.slice(LIBRARY_PREFIX.length);
      try {
        const arr = JSON.parse(r.value);
        if (Array.isArray(arr)) arr.forEach(c => { if (c && c.image) push(catKey, c); });
      } catch {}
    }
  } catch {}

  // 경로 방식 카드들: 서명 URL 일괄 발급 후 image/originalImage 채우기
  if (needSign.length) {
    const allPaths = [];
    for (const c of needSign) {
      if (c.imagePath) allPaths.push(c.imagePath);
      if (c.originalPath) allPaths.push(c.originalPath);
    }
    const urls = await resolveSignedUrls(allPaths);
    for (const c of needSign) {
      c.image = (c.imagePath && urls[c.imagePath]) || '';
      c.originalImage = (c.originalPath && urls[c.originalPath]) || null;
    }
  }

  return { map, hadError };
};

// 라이브러리에서 카테고리 하나의 카드 전부 삭제 (카테고리 자체를 지울 때)
const deleteLibraryCategoryCards = async (cards) => {
  await Promise.all((cards || []).map(c => deleteLibraryCard(c.id)));
};

// ───── 관리자: 특정 선생님의 보관함 카드 열람 ─────
// admin_get_aac_data(선생님id)로 카드 행을 받아, 경로 방식 카드는 서명 URL을 채워 반환.
// 반환: { cards: [{id,label,categoryId,image(서명URL),imagePath,_ownerId}], error }
const adminLoadTeacherLibrary = async (teacherUserId) => {
  try {
    const rows = await adminGetAacData(teacherUserId);
    const cards = [];
    const needSign = [];
    for (const r of (rows || [])) {
      if (!r.key || !r.key.startsWith(LIBCARD_PREFIX)) continue;
      let c = null;
      try { c = JSON.parse(r.value); } catch { c = null; }
      if (!c) continue;
      if (c.imagePath || c.image) {
        c._ownerId = teacherUserId;
        cards.push(c);
        if (c.imagePath) needSign.push(c);
      }
    }
    // 경로 방식 카드: 서명 URL 발급(관리자는 Edge Function이 남의 폴더도 허용)
    if (needSign.length) {
      const paths = [];
      for (const c of needSign) {
        if (c.imagePath) paths.push(c.imagePath);
        if (c.originalPath) paths.push(c.originalPath);
      }
      const urls = await resolveSignedUrls(paths);
      for (const c of needSign) {
        c.image = (c.imagePath && urls[c.imagePath]) || '';
        c.originalImage = (c.originalPath && urls[c.originalPath]) || null;
      }
    }
    return { cards, error: false };
  } catch (e) {
    devWarn('선생님 보관함 로드 실패:', e);
    return { cards: [], error: true };
  }
};

// 서명 URL(또는 data URL) 이미지를 data URL로 변환 (내 폴더로 복사하기 위함)
const urlToDataUrl = async (url) => {
  try {
    if (!url) return null;
    if (url.startsWith('data:')) return url; // 이미 data URL
    const r = await fetch(url);
    if (!r.ok) return null;
    const blob = await r.blob();
    return await new Promise((resolve) => {
      const fr = new FileReader();
      fr.onloadend = () => resolve(fr.result);
      fr.onerror = () => resolve(null);
      fr.readAsDataURL(blob);
    });
  } catch { return null; }
};

// 구버전(카테고리 통째 행)을 신규(카드 1장=1행)로 이전.
// 구버전 행이 있으면: 각 카드를 신규 키로 저장 → 구버전 행 삭제. 이전한 게 있으면 true 반환.
const migrateLegacyLibrary = async () => {
  let migrated = false;
  try {
    const oldRes = await dataList(LIBRARY_PREFIX);
    for (const r of (oldRes.rows || [])) {
      const catKey = r.key.slice(LIBRARY_PREFIX.length); // categoryId 또는 __none__
      let arr = [];
      try { arr = JSON.parse(r.value); } catch { arr = []; }
      if (!Array.isArray(arr)) arr = [];
      const categoryId = (catKey === LIBRARY_NONE) ? null : catKey;
      // 각 카드를 신규 카드 키로 저장
      for (const c of arr) {
        if (!c || !c.image) continue;
        const card = {
          id: c.id || `lib_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          image: c.image,
          originalImage: c.originalImage || null,
          label: c.label || '',
          categoryId,
        };
        await saveLibraryCard(card).catch(() => {});
      }
      // 구버전 통째 행 삭제
      await dataDelete(r.key).catch(() => {});
      migrated = true;
    }
  } catch (e) { devWarn('라이브러리 이전 실패:', e); }
  return migrated;
};

// ───── base64 → Storage 마이그레이션 (2-pass 안전) ─────
// 본인 계정의 라이브러리 카드 중 아직 base64(image)로 저장된 것들을:
//   1) Storage(aac-cards)에 업로드 → 경로 확보
//   2) aac_data 행을 경로 방식으로 갱신 (저장 성공 확인)
//   3) 위 둘이 성공한 카드에 한해서만 완료 처리 (base64는 행에서 이미 빠짐)
// 실패한 카드는 원본(base64) 행을 그대로 두어 유실 방지.
//
// ★ 중요: base64가 크면 여러 행을 한꺼번에 읽는 순간 statement timeout(500)이 난다.
//   그래서 여기서는 (a) key 목록만 가볍게 조회하고, (b) 본문은 한 장씩 개별로 읽어 처리.
//   → 무거운 value를 한 번에 긁지 않으므로 타임아웃 회피.
//
// onProgress({ done, total, ok, fail }) 콜백으로 진행률 통지.
// 반환: { total, ok, fail, alreadyDone, failedIds }
const migrateBase64ToStorage = async (onProgress) => {
  // (a) key 목록만 가볍게 조회 (value 제외 → 타임아웃 안 남)
  const uid = (await getCurrentAuthUser())?.id;
  if (!uid) return { total: 0, ok: 0, fail: -1, alreadyDone: 0, failedIds: [] };
  const headers = await authHeaders();

  const keys = [];
  const PAGE = 500; // key만이라 가벼움 → 넉넉히
  let offset = 0;
  for (let guard = 0; guard < 200; guard++) {
    const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${uid}` +
      `&select=key&key=like.${encodeURIComponent(LIBCARD_PREFIX)}*` +
      `&order=key.asc&limit=${PAGE}&offset=${offset}`;
    const r = await fetch(url, { headers });
    if (!r.ok) {
      if (offset === 0) return { total: 0, ok: 0, fail: -1, alreadyDone: 0, failedIds: [] };
      break;
    }
    const rows = await r.json();
    if (!Array.isArray(rows) || rows.length === 0) break;
    for (const row of rows) keys.push(row.key);
    if (rows.length < PAGE) break;
    offset += PAGE;
  }

  // (b) 한 장씩 본문을 읽어 처리
  const total = keys.length; // 상한(이미 이전된 것 포함) — 실제 대상은 처리하며 셈
  let ok = 0, fail = 0, alreadyDone = 0, processed = 0;
  const failedIds = [];
  const report = () => { if (onProgress) onProgress({ done: processed, total, ok, fail }); };
  report();

  for (const key of keys) {
    processed++;
    let c = null;
    try {
      const row = await dataGet(key); // 한 장만 읽음 → 안전
      if (row?.value) c = JSON.parse(row.value);
    } catch { c = null; }

    if (!c) { report(); continue; }
    if (c.imagePath) { alreadyDone++; report(); continue; } // 이미 경로 방식
    if (!(typeof c.image === 'string' && c.image.startsWith('data:'))) { report(); continue; }

    try {
      // 1) 표시용 이미지 업로드
      const imagePath = await storageUpload(c.id, c.image, '');
      if (!imagePath) { fail++; failedIds.push(c.id); report(); continue; }
      // 원본(있으면) 업로드 — 실패해도 치명적 아님
      let originalPath = null;
      if (typeof c.originalImage === 'string' && c.originalImage.startsWith('data:')) {
        originalPath = await storageUpload(c.id, c.originalImage, 'orig');
      }
      // 2) 경로 방식으로 행 갱신 (base64 제거 — 이 순간 용량 회수)
      const body = {
        id: c.id,
        imagePath,
        originalPath,
        label: c.label || '',
        categoryId: c.categoryId || null,
      };
      const saved = await dataSet(LIBCARD_KEY(c.id), JSON.stringify(body));
      if (!saved) { fail++; failedIds.push(c.id); report(); continue; }
      ok++; report();
    } catch (e) {
      devWarn('마이그레이션 카드 실패:', c?.id, e);
      fail++; failedIds.push(c.id); report();
    }
  }
  return { total, ok, fail, alreadyDone, failedIds };
};



// 미리보기/iframe 환경에서 confirm/alert이 차단되는 경우 대비 안전 래퍼
// sandbox iframe에서는 confirm()이 에러도 안 내고 undefined를 반환하며 무시됨
// 그래서 결과가 undefined면 "차단된 환경"으로 간주하고 true(확인) 반환
const safeConfirm = (msg) => {
  try {
    const result = window.confirm(msg);
    // sandbox iframe에서 confirm이 무시되면 undefined 반환됨
    if (result === undefined) {
      devWarn('confirm 차단됨 (sandbox), 기본 동작 진행:', msg);
      return true;
    }
    return result;
  } catch (e) {
    devWarn('confirm 차단됨, 기본 동작 진행:', msg);
    return true;
  }
};

const safeAlert = (msg) => {
  // 1) 일반 alert 시도 (배포 환경)
  try {
    window.alert(msg);
    return;
  } catch (e) {
    devWarn('alert 차단됨:', msg);
  }
  // 2) sandbox 환경이라 alert 차단 - 화면 내 toast로 표시
  try {
    const existing = document.getElementById('__safe_alert_toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = '__safe_alert_toast';
    toast.style.cssText = `
      position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(28, 25, 23, 0.95); color: white;
      padding: 12px 20px; border-radius: 12px;
      font-size: 13px; font-weight: 500; z-index: 9999;
      max-width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      white-space: pre-line; text-align: center;
      font-family: "Pretendard", "Noto Sans KR", sans-serif;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  } catch (e) {
    devWarn('toast 표시 실패:', e);
  }
};

const safePrompt = (msg, defaultVal = '') => {
  try {
    const result = window.prompt(msg, defaultVal);
    if (result === undefined) {
      // sandbox에서 차단됨 - 기본값 반환 (아무것도 안 함과 같음)
      devWarn('prompt 차단됨 (sandbox):', msg);
      return null;
    }
    return result;
  } catch (e) {
    devWarn('prompt 차단됨:', msg);
    return null;
  }
};

// (A방식: 비밀번호 해싱/하드코딩 관리자 계정 제거됨 — Supabase Auth가 인증 전담)

// ============================================================

const SIZE_OPTIONS = [
  { mm: 50, label: '50mm', desc: '큰 카드' },
  { mm: 45, label: '45mm', desc: '표준' },
  { mm: 40, label: '40mm', desc: '작은 카드' },
  { mm: 30, label: '30mm', desc: '미니' },
];

const LABEL_POS = [
  { id: 'bottom', label: '아래' },
  { id: 'top', label: '위' },
  { id: 'inside-bottom', label: '내부 하단' },
  { id: 'none', label: '없음' },
];

const FONT_OPTIONS = [
  { id: 'sans', label: '고딕', css: '"Pretendard", "Noto Sans KR", sans-serif' },
  { id: 'serif', label: '명조', css: '"Noto Serif KR", serif' },
  { id: 'round', label: '둥근', css: '"Jua", "Pretendard", sans-serif' },
];

const MM_TO_PX = 3.78; // 1mm ≈ 3.78px (96dpi 기준)

// A4 크기 (mm)
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 10;
const HEADER_HEIGHT_MM = 7; // 페이지 상단 헤더 영역 ('검단ABA 언어행동연구소 · N/M' 텍스트 + 아래 여백, 안전 마진 포함)

// 고유 ID 생성
let _idCounter = 0;
const newId = () => `card_${Date.now()}_${++_idCounter}`;

// ─────────────────────────────────────────────────────────────
// 이미지를 정사각형으로 자르기 (Canvas)
// ─────────────────────────────────────────────────────────────
const cropToSquare = (dataUrl, outputSize = 400) => {
  return new Promise((resolve, reject) => {
    // 입력 검증: 빈 문자열이나 잘못된 타입이면 즉시 실패
    if (!dataUrl || typeof dataUrl !== 'string') {
      reject(new Error('이미지 데이터가 비어있습니다'));
      return;
    }
    const img = new Image();
    let settled = false;
    const settle = (fn, val) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(val);
    };
    // 손상된 파일에서 onload/onerror 둘 다 안 불릴 가능성 - 10초 타임아웃
    const timer = setTimeout(() => {
      settle(reject, new Error('이미지 처리 시간 초과'));
    }, 10000);
    img.onload = () => {
      try {
        const size = Math.min(img.width, img.height);
        // 0×0 이미지(손상된 SVG 등) 거부
        if (size <= 0) {
          settle(reject, new Error('이미지 크기가 0이거나 손상된 파일입니다'));
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = outputSize;
        canvas.height = outputSize;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outputSize, outputSize);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, outputSize, outputSize);
        // JPEG 0.82로 압축 - 화질 충분, 용량 약 절반
        settle(resolve, canvas.toDataURL('image/jpeg', 0.82));
      } catch (err) {
        settle(reject, err);
      }
    };
    img.onerror = () => settle(reject, new Error('이미지 디코딩 실패 - 손상되었거나 지원하지 않는 형식'));
    img.src = dataUrl;
  });
};

// 원본 이미지도 적당히 축소 (편집용으로만 사용, 너무 클 필요 없음)
const downscaleImage = (dataUrl, maxSide = 800, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!dataUrl || typeof dataUrl !== 'string') {
      reject(new Error('이미지 데이터가 비어있습니다'));
      return;
    }
    const img = new Image();
    let settled = false;
    const settle = (fn, val) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(val);
    };
    const timer = setTimeout(() => {
      settle(reject, new Error('이미지 처리 시간 초과'));
    }, 10000);
    img.onload = () => {
      try {
        let w = img.width;
        let h = img.height;
        if (w <= 0 || h <= 0) {
          settle(reject, new Error('이미지 크기가 0이거나 손상된 파일입니다'));
          return;
        }
        // 큰 변을 maxSide로 맞춤 (작은 이미지는 그대로)
        if (w > maxSide || h > maxSide) {
          if (w > h) {
            h = Math.round(h * (maxSide / w));
            w = maxSide;
          } else {
            w = Math.round(w * (maxSide / h));
            h = maxSide;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        // ⚠️ JPEG는 투명도 지원 안 함 - 투명 배경은 검정으로 변하므로 흰색으로 먼저 채움
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        settle(resolve, canvas.toDataURL('image/jpeg', quality));
      } catch (err) {
        settle(reject, err);
      }
    };
    img.onerror = () => settle(reject, new Error('이미지 디코딩 실패 - 손상되었거나 지원하지 않는 형식'));
    img.src = dataUrl;
  });
};

// ─────────────────────────────────────────────────────────────
// localStorage quota 회복: 다른 사용자의 오래된 draft만 정리
// ─────────────────────────────────────────────────────────────
// 절대 건드리지 않는 것: 본인 draft, 히스토리 본문(aac_history_item:*),
//                     히스토리 인덱스, 카테고리, 사용자 DB, 인증 세션
// 같은 기기를 여러 BCBA가 공유하는 경우, 다른 사람 작업 중 임시 데이터만 정리됨
// draft는 어차피 새로고침 보호용 임시 데이터이지 영구 저장이 아니므로 안전
const cleanupOldDrafts = (currentUsername) => {
  let cleanedCount = 0;
  try {
    const targetKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      // 다른 사용자의 draft만 대상 (본인 것은 제외)
      if (k.startsWith(DRAFT_KEY_PREFIX) && k !== `${DRAFT_KEY_PREFIX}${currentUsername}`) {
        targetKeys.push(k);
      }
    }
    for (const k of targetKeys) {
      try {
        localStorage.removeItem(k);
        cleanedCount++;
      } catch {
        // 개별 키 삭제 실패는 무시 (다음 키 계속 시도)
      }
    }
  } catch {
    // localStorage 접근 자체가 차단되면 정리 못 함 - 호출자에서 처리
  }
  return cleanedCount;
};

// ─────────────────────────────────────────────────────────────
// 카드 한 장 (편집용)
// ─────────────────────────────────────────────────────────────
// 카드 한 장 컴포넌트 - React.memo로 불필요한 리렌더링 방지
// 카드 1장 라벨 입력 시 다른 카드들이 리렌더링되지 않게 함
const CardEditor = React.memo(({ card, onUpdate, onDelete, onDuplicate, onEditImage, sizeMm, labelPos, font, labelSize, categories, isDragging, onDragStart, onDragOver, onDragEnd, onDrop, dragOverIndex, index }) => {
  const sizePx = sizeMm * MM_TO_PX * 1.4; // 편집 화면에서는 좀 더 크게
  const showLabel = labelPos !== 'none';
  const labelInside = labelPos === 'inside-bottom';

  const rotation = card.rotation || 0;
  const flipH = card.flipH ? -1 : 1;
  const imgTransform = `rotate(${rotation}deg) scaleX(${flipH})`;

  const rotateRight = () => onUpdate(card.id, { ...card, rotation: (rotation + 90) % 360 });
  const flip = () => onUpdate(card.id, { ...card, flipH: !card.flipH });

  // 카테고리 색상
  const cat = categories?.find(c => c.id === card.categoryId);
  // 카테고리가 있으면 테두리도 그 색으로 (드래그/오버 상태가 아닐 때만)
  const borderStyle = cat && !isDragging && dragOverIndex !== index
    ? { borderColor: cat.color + '60' } // 60 = 약 38% 투명
    : undefined;

  // draggable은 외부 컨테이너에 두지 않고, 핸들에만 둠
  // 드롭 영역은 카드 전체
  return (
    <div
      onDragOver={(e) => onDragOver?.(e, index)}
      onDrop={(e) => onDrop?.(e, index)}
      onDragEnd={onDragEnd}
      style={borderStyle}
      className={`group relative bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
        isDragging
          ? 'border-amber-400 opacity-50 scale-95'
          : dragOverIndex === index
            ? 'border-amber-500 ring-2 ring-amber-200 shadow-lg'
            : cat
              ? 'hover:shadow-lg'
              : 'border-stone-200 hover:border-stone-300 hover:shadow-lg'
      }`}
    >
      {/* 카테고리 색 띠 (좀 더 두껍게) */}
      {cat && (
        <div className="h-1.5 w-full" style={{ backgroundColor: cat.color }} />
      )}

      {/* 드래그 핸들 (좌측 상단) - 이 영역에서만 드래그 시작 */}
      <div
        draggable
        onDragStart={(e) => onDragStart?.(e, index)}
        className="hidden sm:block absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{ cursor: 'grab' }}
        title="드래그해서 순서 변경"
      >
        <div className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm">
          <GripVertical className="w-3.5 h-3.5 text-stone-500" />
        </div>
      </div>

      {/* 카드 미리보기 */}
      <div className="p-4 pb-3 flex flex-col items-center">
        <div
          className="relative bg-stone-50 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
        >
          {card.image ? (
            <img
              src={card.image}
              alt={card.label || ''}
              className="w-full h-full object-cover"
              style={{ transform: imgTransform }}
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-stone-300" strokeWidth={1.5} />
          )}

          {/* 내부 라벨 */}
          {showLabel && labelInside && card.label && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm text-center py-1 px-1"
              style={{ fontFamily: font.css, fontSize: `${labelSize}px`, fontWeight: 600 }}
            >
              {card.label}
            </div>
          )}

          {/* 회전/뒤집기/편집 버튼 (이미지 위에 hover시) */}
          {card.image && (
            <div className="absolute bottom-1 left-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                onClick={rotateRight}
                className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm"
                title="90도 회전"
                aria-label="이미지 90도 회전"
              >
                <RotateCw className="w-3 h-3 text-stone-600" />
              </button>
              <button
                onClick={flip}
                className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm"
                title="좌우 반전"
                aria-label="이미지 좌우 반전"
              >
                <FlipHorizontal className="w-3 h-3 text-stone-600" />
              </button>
              {onEditImage && (
                <button
                  onClick={() => onEditImage(card)}
                  className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm"
                  title="이미지 편집 (자르기/밝기/대비)"
                  aria-label="이미지 편집 (자르기, 밝기, 대비 조절)"
                >
                  <Crop className="w-3 h-3 text-stone-600" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* 외부 라벨 (카드 위/아래) */}
        {showLabel && !labelInside && (
          <div
            className={`text-center px-2 mt-2 ${labelPos === 'top' ? 'order-first mb-2 mt-0' : ''}`}
            style={{ fontFamily: font.css, fontSize: `${labelSize}px`, fontWeight: 600, minHeight: `${labelSize + 4}px`, color: '#1c1917' }}
          >
            {card.label || <span className="text-stone-300 font-normal">라벨 없음</span>}
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-300 transition">
          <Type className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={card.label}
            onChange={(e) => onUpdate(card.id, { ...card, label: e.target.value })}
            placeholder="글자 입력..."
            className="flex-1 bg-transparent text-base font-medium outline-none text-stone-900 placeholder-stone-400 min-w-0"
            maxLength={20}
            style={{ fontFamily: font?.css }}
          />
        </div>

        {/* 카테고리 선택 */}
        {categories && categories.length > 0 && (
          <select
            value={card.categoryId || ''}
            onChange={(e) => onUpdate(card.id, { ...card, categoryId: e.target.value || null })}
            className="mt-2 w-full text-xs bg-stone-50 border border-stone-200 rounded-md px-2 py-1.5 outline-none focus:border-amber-400 cursor-pointer"
            style={cat ? { borderLeftColor: cat.color, borderLeftWidth: '4px' } : {}}
          >
            <option value="">카테고리 없음</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* 삭제/복제 버튼 */}
      <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={() => onDuplicate(card.id)}
          className="w-7 h-7 rounded-md bg-white/95 border border-stone-200 hover:bg-stone-50 flex items-center justify-center shadow-sm"
          title="복제"
          aria-label="카드 복제"
        >
          <Copy className="w-3.5 h-3.5 text-stone-600" />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="w-7 h-7 rounded-md bg-white/95 border border-stone-200 hover:bg-red-50 hover:border-red-200 flex items-center justify-center shadow-sm"
          title="삭제"
          aria-label="카드 삭제"
        >
          <X className="w-3.5 h-3.5 text-stone-600 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// PDF 페이지 미리보기 (인쇄용)
// ─────────────────────────────────────────────────────────────
const PrintPreview = ({ cards, sizeMm, labelPos, font, labelSize, gap, showCutLines, cutLineWidth, cutLineStyle, cutLineColor, cardRadius = 0, safetyMargin = 0, doubleSided = false, backDesign = 'label', backColor = '#fef3c7', logoUrl = '' }) => {
  // A4에 들어가는 카드 수 계산 (코팅 여백 포함)
  const cardWithLabelMm = labelPos === 'none' || labelPos === 'inside-bottom'
    ? sizeMm
    : sizeMm + (labelSize / MM_TO_PX) + 2;

  const cardWidthWithMargin = sizeMm + safetyMargin * 2;
  const cardHeightWithMargin = cardWithLabelMm + safetyMargin * 2;

  const usableWidthMm = A4_WIDTH_MM - PAGE_MARGIN_MM * 2;
  // 헤더 영역('검단ABA · N/M')만큼 빼야 카드가 페이지 경계 안 넘김
  const usableHeightMm = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2 - HEADER_HEIGHT_MM;
  const colsPerPage = Math.max(1, Math.floor((usableWidthMm + gap) / (cardWidthWithMargin + gap)));
  const rowsPerPage = Math.max(1, Math.floor((usableHeightMm + gap) / (cardHeightWithMargin + gap)));
  const cardsPerPage = colsPerPage * rowsPerPage;

  // 페이지로 나누기 (앞면)
  const frontPages = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    frontPages.push(cards.slice(i, i + cardsPerPage));
  }
  if (frontPages.length === 0) frontPages.push([]);

  // 양면 인쇄: 앞면 페이지마다 뒷면 페이지 생성 (좌우 반전해서 정렬)
  // 종이를 짧은 쪽으로 뒤집어 다시 넣었을 때 카드 위치가 맞도록 각 행을 좌우 반전
  const allPages = [];
  if (doubleSided) {
    frontPages.forEach((pageCards) => {
      allPages.push({ cards: pageCards, isBack: false });
      // 뒷면: 같은 페이지 카드들을 좌우 반전 정렬
      // 한 줄씩 분리해서 reverse한 후 다시 합침
      const backOrdered = [];
      for (let r = 0; r < rowsPerPage; r++) {
        const rowCards = pageCards.slice(r * colsPerPage, (r + 1) * colsPerPage);
        // 빈 자리는 빈 카드로 채워서 줄 끝을 정렬
        while (rowCards.length < colsPerPage) {
          rowCards.push({ id: `empty_${r}_${rowCards.length}`, image: null, label: '' });
        }
        backOrdered.push(...rowCards.reverse());
      }
      allPages.push({ cards: backOrdered, isBack: true });
    });
  } else {
    frontPages.forEach((pageCards) => allPages.push({ cards: pageCards, isBack: false }));
  }

  return (
    <div className="space-y-6">
      {allPages.map((page, pageIdx) => (
        <PrintablePage
          key={pageIdx}
          pageNum={pageIdx + 1}
          totalPages={allPages.length}
          cards={page.cards}
          cols={colsPerPage}
          sizeMm={sizeMm}
          labelPos={labelPos}
          font={font}
          labelSize={labelSize}
          gap={gap}
          showCutLines={showCutLines}
          cutLineWidth={cutLineWidth}
          cutLineStyle={cutLineStyle}
          cutLineColor={cutLineColor}
          cardRadius={cardRadius}
          safetyMargin={safetyMargin}
          isBack={page.isBack}
          backDesign={backDesign}
          backColor={backColor}
          logoUrl={logoUrl}
        />
      ))}
    </div>
  );
};

const PrintablePage = ({ pageNum, totalPages, cards, cols, sizeMm, labelPos, font, labelSize, gap, showCutLines, cutLineWidth, cutLineStyle, cutLineColor, cardRadius = 0, safetyMargin = 0, isBack = false, backDesign = 'label', backColor = '#fef3c7', logoUrl = '' }) => {
  return (
    <div className="bg-white shadow-md mx-auto print:shadow-none print:m-0" data-print-page="true"
         style={{
           width: `${A4_WIDTH_MM}mm`,
           height: `${A4_HEIGHT_MM}mm`,
           padding: `${PAGE_MARGIN_MM}mm`,
           boxSizing: 'border-box', // padding 포함 정확히 A4 297mm 유지
           overflow: 'hidden',       // 만에 하나 카드가 넘쳐도 다음 페이지로 흘리지 않음
         }}>
      <div className="text-[8px] text-stone-400 mb-2 print:text-stone-300 flex justify-between" style={{ fontFamily: font.css }}>
        <span>검단ABA 언어행동연구소{isBack ? ' · 뒷면' : ''}</span>
        <span>{pageNum} / {totalPages}</span>
      </div>

      <div className="grid" style={{
        gridTemplateColumns: `repeat(${cols}, ${sizeMm + safetyMargin * 2}mm)`,
        gap: `${gap}mm`,
        justifyContent: 'flex-start',
      }}>
        {cards.map((card) => (
          <PrintCard
            key={card.id}
            card={card}
            sizeMm={sizeMm}
            labelPos={labelPos}
            font={font}
            labelSize={labelSize}
            showCutLines={showCutLines}
            cutLineWidth={cutLineWidth}
            cutLineStyle={cutLineStyle}
            cutLineColor={cutLineColor}
            cardRadius={cardRadius}
            safetyMargin={safetyMargin}
            isBack={isBack}
            backDesign={backDesign}
            backColor={backColor}
            logoUrl={logoUrl}
          />
        ))}
      </div>
    </div>
  );
};

const PrintCard = ({ card, sizeMm, labelPos, font, labelSize, showCutLines, cutLineWidth, cutLineStyle, cutLineColor, cardRadius = 0, safetyMargin = 0, isBack = false, backDesign = 'label', backColor = '#fef3c7', logoUrl = '' }) => {
  const showLabel = labelPos !== 'none';
  const labelInside = labelPos === 'inside-bottom';
  // 자르는 선 두께를 mm로 변환 (CSS 명세: 1px ≈ 0.265mm @ 96dpi 기준)
  // px 그대로 두면 600dpi 프린터에서 너무 얇게 출력될 가능성 - mm로 명시해서 인쇄 결과 안정화
  const cutBorder = showCutLines
    ? `${((cutLineWidth || 1) * 0.265).toFixed(3)}mm ${cutLineStyle || 'dashed'} ${cutLineColor || '#cbd5e1'}`
    : 'none';

  // 이미지 회전/뒤집기 transform
  const rotation = card.rotation || 0;
  const flipH = card.flipH ? -1 : 1;
  const imgTransform = `rotate(${rotation}deg) scaleX(${flipH})`;

  // 카드 박스 공통 스타일
  const cardBoxStyle = {
    width: `${sizeMm}mm`,
    height: `${sizeMm}mm`,
    border: cutBorder,
    background: '#fff',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: cardRadius > 0 ? `${cardRadius}mm` : 0,
    boxSizing: 'border-box',
  };
  // 코팅 여백을 위한 wrapper 스타일 (border-box로 카드 자체 크기는 유지)
  const wrapperStyle = {
    width: `${sizeMm + safetyMargin * 2}mm`,
    padding: safetyMargin > 0 ? `${safetyMargin}mm` : 0,
    boxSizing: 'border-box',
  };

  // ───── 뒷면 렌더링 ─────
  if (isBack) {
    let backContent;
    if (backDesign === 'logo') {
      backContent = logoUrl ? (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '4mm',
          background: '#fafaf9',
        }}>
          <img src={logoUrl} alt="" style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }} />
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#fafaf9' }} />
      );
    } else if (backDesign === 'solid') {
      backContent = <div style={{ width: '100%', height: '100%', background: backColor }} />;
    } else if (backDesign === 'pattern') {
      // 사선 줄무늬 패턴
      backContent = (
        <div style={{
          width: '100%', height: '100%',
          background: `repeating-linear-gradient(45deg, ${backColor}, ${backColor} 3mm, #fff 3mm, #fff 6mm)`,
        }} />
      );
    } else {
      // 'label' - 글자만 (정답/단서 카드용)
      backContent = (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '3mm',
          background: '#fff',
        }}>
          <span style={{
            fontFamily: font.css,
            fontSize: `${Math.min(labelSize * 1.8, sizeMm * 2)}px`,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            color: '#1c1917',
          }}>
            {card.label || ''}
          </span>
        </div>
      );
    }
    return (
      <div style={wrapperStyle}>
        <div style={cardBoxStyle}>
          {backContent}
        </div>
      </div>
    );
  }

  // ───── 앞면 렌더링 (기존 로직 + radius/margin) ─────
  if (labelPos === 'top' && showLabel) {
    return (
      <div style={wrapperStyle}>
        <div style={{
          fontFamily: font.css,
          fontSize: `${labelSize}px`,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: '1mm',
          minHeight: `${labelSize + 2}px`,
          lineHeight: 1.1,
        }}>
          {card.label || ''}
        </div>
        <div style={cardBoxStyle}>
          {card.image && <img src={card.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: imgTransform }} />}
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardBoxStyle}>
        {card.image && <img src={card.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: imgTransform }} />}
        {showLabel && labelInside && card.label && (
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,0.92)',
            textAlign: 'center',
            fontFamily: font.css,
            fontSize: `${labelSize}px`,
            fontWeight: 600,
            padding: '1mm 0.5mm',
            lineHeight: 1.1,
          }}>
            {card.label}
          </div>
        )}
      </div>
      {showLabel && labelPos === 'bottom' && (
        <div style={{
          fontFamily: font.css,
          fontSize: `${labelSize}px`,
          fontWeight: 600,
          textAlign: 'center',
          marginTop: '1mm',
          minHeight: `${labelSize + 2}px`,
          lineHeight: 1.1,
        }}>
          {card.label || ''}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 로그인 화면
// ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      // Supabase Auth 로그인 (이메일+비번). 비번은 Auth가 서버에서 검증.
      const result = await signInWithPassword(email.trim(), password);
      if (result.error || !result.user) {
        setError(result.error || '이메일 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
        return;
      }
      const u = result.user;
      const isAdmin = await checkIsAdmin();
      onLogin({
        id: u.id,
        email: u.email,
        role: isAdmin ? 'admin' : 'teacher',
        name: u.user_metadata?.display_name || u.email?.split('@')[0] || u.email,
      });
    } catch (err) {
      setError('로그인 처리 중 오류가 발생했습니다.');
      devError(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-rose-50 flex items-center justify-center p-6"
         style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg p-3 mb-4">
            <img src={LOGO_DATA_URL} alt="검단ABA" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-stone-900">검단ABA AAC maker</h1>
          <p className="text-xs text-stone-500 mt-1">언어행동연구소 직원 전용</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-7">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-stone-700" />
            <h2 className="text-sm font-bold text-stone-900">로그인</h2>
          </div>

          <div className="space-y-3">
            {/* 브라우저 자동완성 차단용 미끼 필드 (화면에 보이지 않음) */}
            <input type="text" name="username" tabIndex={-1} aria-hidden="true" autoComplete="username" style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }} />
            <input type="password" name="password" tabIndex={-1} aria-hidden="true" autoComplete="current-password" style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }} />
            <div>
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 block">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                autoFocus
                autoComplete="off"
                inputMode="email"
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 outline-none focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                placeholder="이메일 주소"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 block">비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  autoComplete="new-password"
                  className="w-full px-3 py-2.5 pr-10 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 outline-none focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                  placeholder="비밀번호"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-sm font-bold rounded-lg shadow-sm transition mt-2"
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
          </div>

          <p className="text-[11px] text-stone-400 text-center mt-5 leading-relaxed">
            계정이 필요하신 분은<br/>관리자에게 문의해주세요
          </p>
        </div>

        {/* 처음 사용 안내 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-stone-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 inline-block leading-relaxed">
            💬 처음 사용하시거나 문제가 있으면<br/>
            <span className="font-semibold">민다혜 선생님께 문의</span>해주세요
          </p>
        </div>

        <div className="mt-6 text-center text-[10px] text-stone-400 leading-relaxed">
          <p className="font-medium text-stone-500">© 검단ABA 언어행동연구소 · 민다혜 (BCBA)</p>
          <p className="mt-1.5">본 자료는 검단ABA언어행동연구소의 지적재산입니다.</p>
          <p>무단 복제·배포·재판매·온라인 게시를 엄격히 금지합니다.</p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 사용자 관리 (관리자 전용)
// ─────────────────────────────────────────────────────────────
const UserManagement = ({ users, onUpdate, onClose, currentUser, onImportCard }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [resetPwUser, setResetPwUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // base64 → Storage 마이그레이션 상태
  const [migrating, setMigrating] = useState(false);
  const [migProgress, setMigProgress] = useState(null); // { done, total, ok, fail }
  const [migResult, setMigResult] = useState(null);      // { total, ok, fail, alreadyDone, failedIds }

  // 선생님 보관함 열람 상태
  const [viewTeacher, setViewTeacher] = useState(null);   // 열람 중인 선생님 { user_id, display_name, email }
  const [teacherCards, setTeacherCards] = useState(null); // 로드된 카드 배열
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [teacherError, setTeacherError] = useState(false);
  const [importing, setImporting] = useState({});          // { [cardId]: 'doing'|'done' }

  const openTeacherLibrary = async (u) => {
    setViewTeacher(u);
    setTeacherCards(null);
    setTeacherError(false);
    setTeacherLoading(true);
    setImporting({});
    try {
      const { cards, error } = await adminLoadTeacherLibrary(u.user_id);
      setTeacherCards(cards);
      setTeacherError(error);
    } catch {
      setTeacherError(true);
      setTeacherCards([]);
    } finally {
      setTeacherLoading(false);
    }
  };

  const importOneCard = async (card) => {
    if (!onImportCard || importing[card.id]) return;
    setImporting(prev => ({ ...prev, [card.id]: 'doing' }));
    try {
      // 서명 URL 이미지를 data URL로 변환 → 내 폴더로 복사 저장
      const dataUrl = await urlToDataUrl(card.image);
      const origDataUrl = card.originalImage ? await urlToDataUrl(card.originalImage) : null;
      if (!dataUrl) { setImporting(prev => ({ ...prev, [card.id]: undefined })); return; }
      await onImportCard(
        [{ image: dataUrl, originalImage: origDataUrl, label: card.label || '' }],
        null // 가져온 카드는 미분류로 넣음 (관리자가 원하는 카테고리로 직접 이동)
      );
      setImporting(prev => ({ ...prev, [card.id]: 'done' }));
    } catch (e) {
      setImporting(prev => ({ ...prev, [card.id]: undefined }));
    }
  };

  const runMigration = async () => {
    if (migrating) return;
    if (!safeConfirm('내 계정의 기존 카드 이미지를 Storage로 옮깁니다.\n(안전 방식: 업로드 확인 후에만 기존 데이터 정리)\n\n시작할까요?')) return;
    setMigrating(true);
    setMigResult(null);
    setMigProgress({ done: 0, total: 0, ok: 0, fail: 0 });
    try {
      const result = await migrateBase64ToStorage((p) => setMigProgress(p));
      setMigResult(result);
    } catch (e) {
      setMigResult({ total: 0, ok: 0, fail: -1, alreadyDone: 0, failedIds: [] });
    } finally {
      setMigrating(false);
    }
  };

  // 컴포넌트 마운트 시 admin_list_users RPC로 사용자 목록 가져오기
  useEffect(() => {
    let cancelled = false;
    const loadUsers = async () => {
      setLoading(true);
      const list = await adminListUsers();
      if (cancelled) return;
      onUpdate(list || []);
      setLoading(false);
    };
    loadUsers();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUser = async () => {
    setError('');
    const em = newUser.email.trim();
    const n = newUser.name.trim() || em.split('@')[0];
    const p = newUser.password;

    if (!em || !p) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    if (p.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (users.some(usr => usr.email === em)) {
      setError('이미 등록된 이메일입니다.');
      return;
    }

    const result = await adminCreateUser(em, p, n);
    if (result.error) {
      setError(result.error || '추가 실패');
      return;
    }
    const list = await adminListUsers();
    onUpdate(list || []);
    setNewUser({ email: '', name: '', password: '' });
    setShowAddForm(false);
    safeAlert(`"${n}" 선생님 계정이 추가되었습니다.\n이메일: ${em}\n비밀번호: ${p}\n\n선생님께 안전하게 전달해주세요.`);
  };

  const deleteUser = async (userId, displayName) => {
    if (userId === currentUser.id) {
      safeAlert('자기 자신은 삭제할 수 없습니다.');
      return;
    }
    if (!safeConfirm(`"${displayName}" 계정을 정말 삭제할까요?`)) return;
    const result = await adminDeleteUser(userId);
    if (result.error) {
      safeAlert(result.error || '삭제 실패');
      return;
    }
    const list = await adminListUsers();
    onUpdate(list || []);
  };

  const resetPassword = async (user, newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      safeAlert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    const result = await adminUpdateUserPassword(user.user_id, newPassword);
    if (result.error) {
      safeAlert(result.error || '비밀번호 변경 실패');
      return;
    }
    const list = await adminListUsers();
    onUpdate(list || []);
    setResetPwUser(null);
    const displayName = user.display_name || user.email;
    safeAlert(`"${displayName}" 선생님의 비밀번호가 변경되었습니다.\n새 비밀번호: ${newPassword}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">선생님 계정 관리</h2>
            <span className="text-xs text-stone-500">({users.length}명)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* base64 → Storage 마이그레이션 (관리자/본인 계정) */}
        <div className="px-6 pt-4">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-bold text-sky-900">카드 이미지 Storage 이전</div>
                <div className="text-[11px] text-sky-700 leading-snug mt-0.5">
                  내 계정의 기존 카드를 안전하게 Storage로 옮깁니다(업로드 확인 후 정리).
                </div>
              </div>
              <button
                onClick={runMigration}
                disabled={migrating}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition flex-shrink-0 ${migrating ? 'bg-stone-300 text-stone-500 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}
              >
                {migrating ? '이전 중…' : '이전 시작'}
              </button>
            </div>
            {migProgress && migProgress.total > 0 && (
              <div className="mt-2">
                <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 transition-all"
                    style={{ width: `${Math.round((migProgress.done / migProgress.total) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-sky-700 mt-1">
                  {migProgress.done} / {migProgress.total} (성공 {migProgress.ok} · 실패 {migProgress.fail})
                </div>
              </div>
            )}
            {migResult && (
              <div className={`mt-2 text-[11px] rounded px-2 py-1.5 ${migResult.fail > 0 ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>
                {migResult.fail === -1
                  ? '오류로 중단되었습니다. 다시 시도해주세요.'
                  : migResult.total === 0
                    ? `이전할 카드가 없습니다. (이미 이전됨 ${migResult.alreadyDone}장)`
                    : `완료: 성공 ${migResult.ok}장 · 실패 ${migResult.fail}장${migResult.alreadyDone ? ` · 기존 이전됨 ${migResult.alreadyDone}장` : ''}. ${migResult.fail > 0 ? '실패분은 원본이 그대로 남아 있어 다시 눌러 재시도하면 됩니다.' : '새로고침하면 반영됩니다.'}`}
              </div>
            )}
          </div>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 새 계정 추가 */}
          {!showAddForm ? (
            <button
              onClick={() => { setShowAddForm(true); setError(''); }}
              className="w-full py-3 mb-4 border-2 border-dashed border-stone-300 hover:border-amber-400 hover:bg-amber-50 rounded-xl text-sm font-semibold text-stone-600 hover:text-amber-700 transition flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              새 선생님 계정 추가
            </button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4" />
                새 계정 만들기
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1">이메일</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                    placeholder="teacher@example.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1">선생님 이름</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                    placeholder="홍길동"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1">초기 비밀번호</label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                  placeholder="6자 이상 (선생님께 알려줄 비밀번호)"
                />
              </div>
              {error && (
                <div className="text-xs text-red-600 bg-red-50 rounded px-2 py-1.5 mb-2">{error}</div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={addUser}
                  className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
                >
                  추가
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setNewUser({ email: '', name: '', password: '' }); setError(''); }}
                  className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-lg transition"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {/* 사용자 목록 */}
          <div className="space-y-2">
            {users.map((u) => {
              const isAdminUser = u.email === 'abageomdan@gmail.com';
              const isMe = u.user_id === currentUser.id;
              const dispName = u.display_name || u.email;
              return (
              <div key={u.user_id} className="bg-stone-50 hover:bg-white rounded-xl p-3 border border-stone-200 transition">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isAdminUser ? 'bg-amber-100' : 'bg-stone-200'}`}>
                      {isAdminUser ? (
                        <Shield className="w-4 h-4 text-amber-700" />
                      ) : (
                        <Users className="w-4 h-4 text-stone-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-stone-900 truncate">{dispName}</p>
                        {isMe && (
                          <span className="text-[9px] font-semibold bg-amber-200 text-amber-800 rounded px-1.5 py-0.5">나</span>
                        )}
                        {isAdminUser && (
                          <span className="text-[9px] font-semibold bg-stone-700 text-white rounded px-1.5 py-0.5">관리자</span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">{u.email} · 등록 {u.created_at ? u.created_at.slice(0, 10) : '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!isMe && (
                      <button
                        onClick={() => openTeacherLibrary(u)}
                        className="px-2.5 py-1.5 bg-white hover:bg-sky-50 border border-stone-200 hover:border-sky-200 text-stone-600 hover:text-sky-600 text-[11px] font-medium rounded transition"
                        title="보관함 보기"
                      >
                        <Folder className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => setResetPwUser(u)}
                      className="px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-stone-200 hover:border-blue-200 text-stone-600 hover:text-blue-600 text-[11px] font-medium rounded transition"
                      title="비밀번호 재설정"
                    >
                      <Lock className="w-3 h-3" />
                    </button>
                    {!isMe && !isAdminUser && (
                      <button
                        onClick={() => deleteUser(u.user_id, dispName)}
                        className="px-2.5 py-1.5 bg-white hover:bg-red-50 border border-stone-200 hover:border-red-200 text-stone-600 hover:text-red-500 text-[11px] font-medium rounded transition"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 비밀번호 재설정 폼 */}
                {resetPwUser?.user_id === u.user_id && (
                  <div className="mt-3 pt-3 border-t border-stone-200">
                    <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1.5">새 비밀번호</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        autoFocus
                        placeholder="새 비밀번호 입력 (6자 이상)"
                        className="flex-1 px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') resetPassword(u, e.target.value);
                          if (e.key === 'Escape') setResetPwUser(null);
                        }}
                        id={`pw-input-${u.user_id}`}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById(`pw-input-${u.user_id}`);
                          if (input) resetPassword(u, input.value);
                        }}
                        className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
                      >
                        변경
                      </button>
                      <button
                        onClick={() => setResetPwUser(null)}
                        className="px-3 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-lg transition"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {/* 푸터 안내 */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 text-center rounded-b-2xl">
          💡 새 계정 만들 때 알려드린 비밀번호는 안전한 방법으로 선생님께 전달해주세요
        </div>
      </div>

      {/* 선생님 보관함 열람 모달 */}
      {viewTeacher && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={() => setViewTeacher(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-stone-900 truncate">
                  {viewTeacher.display_name || viewTeacher.email}님의 보관함
                </h3>
                <p className="text-[11px] text-stone-500">카드를 눌러 내 보관함으로 가져올 수 있어요</p>
              </div>
              <button onClick={() => setViewTeacher(null)} className="p-2 hover:bg-stone-100 rounded-lg transition">
                <X className="w-4 h-4 text-stone-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {teacherLoading && (
                <div className="text-center text-sm text-stone-500 py-12">불러오는 중…</div>
              )}
              {!teacherLoading && teacherError && (
                <div className="text-center text-sm text-red-500 py-12">
                  보관함을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
                </div>
              )}
              {!teacherLoading && !teacherError && teacherCards && teacherCards.length === 0 && (
                <div className="text-center text-sm text-stone-400 py-12">보관된 카드가 없습니다.</div>
              )}
              {!teacherLoading && !teacherError && teacherCards && teacherCards.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {teacherCards.map((card) => {
                    const state = importing[card.id];
                    return (
                      <div key={card.id} className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden flex flex-col">
                        <div className="aspect-square bg-white flex items-center justify-center overflow-hidden">
                          {card.image ? (
                            <img src={card.image} alt={card.label || ''} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-[10px] text-stone-300">이미지 없음</span>
                          )}
                        </div>
                        <div className="p-2 flex flex-col gap-1.5">
                          <p className="text-[11px] font-medium text-stone-700 truncate text-center">{card.label || '\u00A0'}</p>
                          <button
                            onClick={() => importOneCard(card)}
                            disabled={!!state}
                            className={`w-full py-1.5 text-[11px] font-bold rounded-lg transition ${
                              state === 'done'
                                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                                : state === 'doing'
                                  ? 'bg-stone-200 text-stone-400 cursor-wait'
                                  : 'bg-sky-600 hover:bg-sky-700 text-white'
                            }`}
                          >
                            {state === 'done' ? '가져옴 ✓' : state === 'doing' ? '가져오는 중…' : '가져오기'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 카테고리 관리 모달
// ─────────────────────────────────────────────────────────────
const CATEGORY_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#78716c',
];

const CategoryManager = ({ categories, onUpdate, onClose }) => {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(CATEGORY_COLORS[0]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const addCategory = () => {
    const name = newName.trim();
    if (!name) return;
    if (categories.some(c => c.name === name)) {
      safeAlert('같은 이름의 카테고리가 이미 있습니다.');
      return;
    }
    onUpdate([
      ...categories,
      { id: `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name, color: newColor },
    ]);
    setNewName('');
    setNewColor(CATEGORY_COLORS[(categories.length + 1) % CATEGORY_COLORS.length]);
  };

  const updateCategory = (id, updates) => {
    onUpdate(categories.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id) => {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    if (!safeConfirm(`"${cat.name}" 카테고리를 삭제할까요? (이 카테고리의 카드들은 카테고리 없음 상태가 됩니다)`)) return;
    onUpdate(categories.filter(c => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">카테고리 관리</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* 새 카테고리 추가 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <p className="text-xs font-semibold text-amber-900 mb-2">새 카테고리</p>
            <div className="flex gap-1.5 mb-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                placeholder="예: 동물, 음식, 행동"
                className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs outline-none focus:border-amber-400"
                maxLength={15}
              />
              <button
                onClick={addCategory}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded transition flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />추가
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    newColor === c ? 'border-stone-900 ring-2 ring-stone-300 scale-110' : 'border-white shadow-sm'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* 기존 카테고리 목록 */}
          {categories.length === 0 ? (
            <p className="text-xs text-stone-400 text-center py-8">아직 카테고리가 없습니다</p>
          ) : (
            <div className="space-y-1.5">
              {categories.map((c) => (
                <div key={c.id} className="bg-stone-50 rounded-lg p-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const next = CATEGORY_COLORS[(CATEGORY_COLORS.indexOf(c.color) + 1) % CATEGORY_COLORS.length];
                      updateCategory(c.id, { color: next });
                    }}
                    className="w-7 h-7 rounded-md border-2 border-white shadow-sm flex-shrink-0 hover:scale-110 transition"
                    style={{ backgroundColor: c.color }}
                    title="색깔 바꾸기"
                  />
                  {editingId === c.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && editName.trim()) {
                          updateCategory(c.id, { name: editName.trim() });
                          setEditingId(null);
                        }
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onBlur={() => {
                        if (editName.trim()) updateCategory(c.id, { name: editName.trim() });
                        setEditingId(null);
                      }}
                      autoFocus
                      className="flex-1 px-2 py-1 text-sm bg-white border border-amber-300 rounded outline-none"
                      maxLength={15}
                    />
                  ) : (
                    <button
                      onClick={() => { setEditingId(c.id); setEditName(c.name); }}
                      className="flex-1 text-left text-sm font-bold text-stone-800 hover:text-amber-700 truncate"
                    >
                      {c.name}
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="p-1.5 hover:bg-red-50 hover:text-red-500 text-stone-500 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 text-center rounded-b-2xl">
          💡 카테고리는 카드 정리에 도움됩니다. 색깔 동그라미를 누르면 색이 바뀝니다.
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 라이브러리 화면 (영구 보관 카드를 카테고리별로 보고 골라 담기)
// ─────────────────────────────────────────────────────────────
const LibraryView = ({
  library, categories, libraryCatId, setLibraryCatId,
  selected, setSelected, onAddToPrint, onAddImagesClick, onImportClick, onManageCategories, onDeleteCard, onDeleteSelected, onMoveSelected, onDiagnose, diagResult, cardSearch, setCardSearch,
}) => {
  // 탭 목록: 카테고리들 + 미분류
  const NONE = '__none__';
  const currentKey = libraryCatId || NONE;
  const cardsInCat = library[currentKey] || [];
  const q = (cardSearch || '').trim().toLowerCase();
  // 검색어가 있으면 "모든 카테고리"에서 찾고, 없으면 현재 카테고리만 보여줌
  const allCards = q
    ? Object.entries(library).flatMap(([catKey, arr]) =>
        (arr || []).map(c => ({ ...c, _catKey: catKey })))
    : [];
  const visible = q
    ? allCards.filter(c => (c.label || '').toLowerCase().includes(q))
    : cardsInCat;

  const countOf = (key) => (library[key] || []).length;
  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const selectedCount = selected.size;

  return (
    <div className="flex flex-col h-full">
      {/* 헤더: 카테고리 관리 버튼 */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-stone-500">카테고리를 골라 카드를 보관하고, 인쇄판에 담아 쓰세요</p>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onDiagnose}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
            title="저장 상태 진단"
          >
            🔍 진단
          </button>
          <button
            onClick={onManageCategories}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
          >
            <Settings2 className="w-3.5 h-3.5" /> 카테고리 관리
          </button>
        </div>
      </div>

      {/* 진단 결과 배너 */}
      {diagResult && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
          {diagResult}
        </div>
      )}

      {/* 카테고리 선택 (드롭다운) */}
      <div className="mb-3">
        <select
          value={currentKey}
          onChange={(e) => {
            const v = e.target.value;
            setLibraryCatId(v === NONE ? null : v);
            setCardSearch('');
          }}
          className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm font-bold text-stone-800 outline-none focus:border-stone-500 transition cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({countOf(cat.id)})
            </option>
          ))}
          <option value={NONE}>미분류 ({countOf(NONE)})</option>
          {/* categories에 없는데 카드가 저장된 키(떠도는 카드) - 안전하게 표시 */}
          {Object.keys(library)
            .filter(k => k !== NONE && !categories.some(c => c.id === k) && (library[k] || []).length > 0)
            .map(k => (
              <option key={k} value={k}>
                (미연결) {(library[k] || []).length}개
              </option>
            ))}
        </select>
      </div>

      {/* 액션 바: 이 카테고리에 카드 추가 / 묶음 불러오기 */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onAddImagesClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" /> 이미지 추가
        </button>
        <button
          onClick={onImportClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-lg transition"
        >
          <FolderOpen className="w-3.5 h-3.5" /> 묶음 불러오기
        </button>
        <span className="text-[11px] text-stone-400 ml-auto hidden sm:block">
          여기서 추가하면 이 카테고리에 저장돼요
        </span>
      </div>

      {/* 검색 (전체 카테고리에서 찾음) */}
      <div className="mb-3 flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2">
        <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <input
          type="text"
          value={cardSearch}
          onChange={(e) => setCardSearch(e.target.value)}
          placeholder="전체 카테고리에서 검색..."
          className="flex-1 bg-transparent text-sm outline-none text-stone-800"
        />
        {cardSearch && (
          <button onClick={() => setCardSearch('')} className="p-1 hover:bg-stone-100 rounded transition flex-shrink-0">
            <X className="w-3 h-3 text-stone-500" />
          </button>
        )}
      </div>
      {q && (
        <p className="text-[11px] text-stone-500 mb-2 -mt-1">
          전체 카테고리에서 "{cardSearch}" 검색 결과 {visible.length}개
        </p>
      )}

      {/* 카드 격자 */}
      <div className="flex-1 overflow-y-auto pb-24">
        {visible.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <Folder className="w-12 h-12 mx-auto mb-3 text-stone-200" strokeWidth={1.5} />
            <p className="text-sm mb-1">
              {q ? `"${cardSearch}"에 해당하는 카드가 없습니다` : '이 카테고리에 저장된 카드가 없습니다'}
            </p>
            {!q && (
              <button
                onClick={onAddImagesClick}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> 이 카테고리에 카드 추가
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {visible.map((card) => {
              const isSel = selected.has(card.id);
              return (
                <div
                  key={card.id}
                  onClick={() => toggle(card.id)}
                  role="button"
                  tabIndex={0}
                  className={`relative rounded-xl overflow-hidden border-2 transition text-left cursor-pointer ${
                    isSel ? 'border-amber-500 ring-2 ring-amber-200' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="aspect-square bg-white">
                    {card.image ? (
                      <img src={card.image} alt={card.label || ''} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  {card.label && (
                    <div className="px-1.5 py-1 text-center text-xs font-semibold text-stone-700 truncate bg-stone-50">
                      {card.label}
                    </div>
                  )}
                  {/* 체크 표시 */}
                  <div className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition ${
                    isSel ? 'bg-amber-500 text-white' : 'bg-white/80 text-stone-300 border border-stone-200'
                  }`}>
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  {/* 삭제 (버튼 중첩 방지 위해 span role=button) */}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); onDeleteCard?.(card.id); }}
                    className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-white/80 border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition"
                    title="이 카드 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 하단 담기 바 (선택된 게 있을 때만) */}
      {selectedCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-stone-200 shadow-lg px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs text-stone-500 hover:text-stone-700 font-medium"
          >
            선택 해제
          </button>
          <div className="flex-1 text-sm font-bold text-stone-800 text-center tabular-nums">
            {selectedCount}장 선택됨
          </div>
          {onMoveSelected && categories && categories.length > 0 && (
            <select
              value=""
              onChange={(e) => { const v = e.target.value; if (v !== '') { onMoveSelected(v === '__none__' ? null : v); } e.target.value = ''; }}
              className="px-3 py-2.5 bg-white border border-stone-200 text-stone-700 text-sm font-medium rounded-lg outline-none focus:border-amber-400 cursor-pointer"
              title="선택 카드를 카테고리로 이동"
            >
              <option value="" disabled>카테고리로 이동…</option>
              <option value="__none__">미분류</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          <button
            onClick={onDeleteSelected}
            className="px-4 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold rounded-lg transition flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> 선택 삭제
          </button>
          <button
            onClick={onAddToPrint}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold rounded-lg transition flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" /> 인쇄판에 담기
          </button>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 일괄 라벨 편집 모달
// ─────────────────────────────────────────────────────────────
const BulkLabelEditor = ({ cards, categories, onUpdate, onClose }) => {
  const [edited, setEdited] = useState(cards.map(c => ({ ...c })));

  const updateRow = (idx, key, value) => {
    setEdited(prev => prev.map((c, i) => i === idx ? { ...c, [key]: value } : c));
  };

  const applyAll = () => {
    onUpdate(edited);
    onClose();
  };

  const fillSequence = () => {
    const prefix = safePrompt('번호 앞에 붙일 단어를 입력하세요 (없으면 빈칸):', '');
    if (prefix === null) return;
    setEdited(prev => prev.map((c, i) => ({
      ...c,
      label: prefix ? `${prefix}${i + 1}` : `${i + 1}`,
    })));
  };

  const setAllCategory = (categoryId) => {
    setEdited(prev => prev.map(c => ({ ...c, categoryId: categoryId || null })));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">일괄 라벨 편집</h2>
            <span className="text-xs text-stone-500">({cards.length}장)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* 일괄 도구 */}
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 flex items-center gap-2 flex-wrap">
          <button
            onClick={fillSequence}
            className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold rounded-lg transition flex items-center gap-1"
          >
            <Tag className="w-3 h-3" />
            번호 자동 채우기
          </button>
          {categories && categories.length > 0 && (
            <select
              onChange={(e) => { if (e.target.value) setAllCategory(e.target.value); e.target.value = ''; }}
              className="px-3 py-1.5 bg-white border border-stone-200 text-xs font-semibold rounded-lg outline-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>전체 카테고리 일괄 변경...</option>
              <option value="__none__">카테고리 없음</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          <span className="text-[11px] text-amber-800 ml-auto">💡 Tab 키로 다음 칸 이동</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1.5">
            {edited.map((card, idx) => {
              const cat = categories?.find(c => c.id === card.categoryId);
              return (
                <div key={card.id} className="flex items-center gap-2 bg-stone-50 hover:bg-white rounded-lg p-2 border border-transparent hover:border-stone-200 transition">
                  <span className="text-[10px] font-bold text-stone-400 w-6 text-center flex-shrink-0">{idx + 1}</span>
                  <div className="w-10 h-10 rounded bg-white border border-stone-200 overflow-hidden flex-shrink-0">
                    {card.image ? (
                      <img src={card.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-stone-300" />
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={card.label}
                    onChange={(e) => updateRow(idx, 'label', e.target.value)}
                    placeholder="라벨..."
                    className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded text-sm outline-none focus:border-amber-400 min-w-0"
                    maxLength={20}
                  />
                  {categories && categories.length > 0 && (
                    <select
                      value={card.categoryId || ''}
                      onChange={(e) => updateRow(idx, 'categoryId', e.target.value || null)}
                      className="text-xs bg-white border border-stone-200 rounded px-2 py-1.5 outline-none cursor-pointer flex-shrink-0"
                      style={cat ? { borderLeftColor: cat.color, borderLeftWidth: '3px' } : {}}
                    >
                      <option value="">없음</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-stone-200 flex items-center justify-end gap-2 rounded-b-2xl bg-stone-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-lg transition"
          >
            취소
          </button>
          <button
            onClick={applyAll}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
          >
            모두 적용
          </button>
        </div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────────────────────
// 이미지 편집 모달 (자르기 + 배경 제거)
// ─────────────────────────────────────────────────────────────
const ImageEditor = ({ card, onSave, onClose }) => {
  const sourceImage = card.originalImage || card.image;
  const [imgDimensions, setImgDimensions] = useState({ w: 0, h: 0 });

  // 자르기 영역 (원본 비율 0~1)
  const [crop, setCrop] = useState({ x: 0, y: 0, size: 1 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [dragMode, setDragMode] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  // 도구 모드: 'crop' (자르기) / 'bg' (배경 제거)
  const [tool, setTool] = useState('crop');

  // 배경 제거 - 클릭으로 색 추가 (여러 색 누적 제거 가능)
  const [bgColors, setBgColors] = useState([]); // [{r,g,b}, ...]
  const [bgTolerance, setBgTolerance] = useState(40); // 허용 오차 0~100
  const [bgFeather, setBgFeather] = useState(10); // 경계 부드러움 0~30
  const [history, setHistory] = useState([]); // 색 추가 히스토리 (되돌리기용)

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const sourceCanvasRef = useRef(null); // 원본 이미지를 그려둔 캔버스 (색 추출용)
  const [processing, setProcessing] = useState(false);

  // 원본 이미지 크기 + 초기 크롭 영역 + 색 추출용 캔버스
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      // 초기 크롭: 짧은 변 기준 정사각형
      const minSide = Math.min(img.naturalWidth, img.naturalHeight);
      if (img.naturalWidth > img.naturalHeight) {
        const xRatio = (img.naturalWidth - minSide) / 2 / img.naturalWidth;
        setCrop({ x: xRatio, y: 0, size: minSide / img.naturalWidth });
      } else {
        const yRatio = (img.naturalHeight - minSide) / 2 / img.naturalHeight;
        setCrop({ x: 0, y: yRatio, size: minSide / img.naturalHeight });
      }
      // 색 추출용 캔버스 (보이지 않음)
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      sourceCanvasRef.current = c;
    };
    img.src = sourceImage;
  }, [sourceImage]);

  // 배경 제거 적용 (캔버스에서)
  const applyBgRemoval = (ctx, w, h) => {
    if (bgColors.length === 0) return;
    const tol = bgTolerance * 2.55; // 0~255
    const featherRange = bgFeather * 2.55; // 부드러움 추가 범위
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      // 등록된 모든 배경색 중 가장 가까운 거리 찾기
      let minDist = Infinity;
      for (const target of bgColors) {
        const dr = r - target.r, dg = g - target.g, db = b - target.b;
        const dist = Math.sqrt(dr*dr + dg*dg + db*db);
        if (dist < minDist) minDist = dist;
      }
      if (minDist < tol) {
        // 완전 제거 (투명)
        data[i+3] = 0;
      } else if (minDist < tol + featherRange) {
        // 경계 영역 - 부드럽게 (반투명)
        const t = (minDist - tol) / featherRange;
        data[i+3] = Math.round(data[i+3] * t);
      }
    }
    ctx.putImageData(imgData, 0, 0);
  };

  // 미리보기 캔버스 렌더링
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imgDimensions.w || !img.complete) return;

    const OUT_SIZE = 400;
    canvas.width = OUT_SIZE;
    canvas.height = OUT_SIZE;
    const ctx = canvas.getContext('2d');
    // 투명 배경을 보이게 하기 위한 체커보드 패턴
    if (bgColors.length > 0) {
      const checker = 16;
      for (let y = 0; y < OUT_SIZE; y += checker) {
        for (let x = 0; x < OUT_SIZE; x += checker) {
          ctx.fillStyle = ((x / checker) + (y / checker)) % 2 === 0 ? '#f5f5f4' : '#e7e5e4';
          ctx.fillRect(x, y, checker, checker);
        }
      }
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, OUT_SIZE, OUT_SIZE);
    }

    // 크롭 영역 계산
    const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
    const cropSize = crop.size * shortSide;
    const cropX = crop.x * imgDimensions.w;
    const cropY = crop.y * imgDimensions.h;

    // 임시 캔버스에 크롭된 이미지 그리기 (배경 제거 처리용)
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = OUT_SIZE;
    tmpCanvas.height = OUT_SIZE;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, OUT_SIZE, OUT_SIZE);
    if (bgColors.length > 0) {
      applyBgRemoval(tmpCtx, OUT_SIZE, OUT_SIZE);
    }
    ctx.drawImage(tmpCanvas, 0, 0);
  }, [crop, imgDimensions, bgColors, bgTolerance, bgFeather]);

  // 이미지 클릭 → 그 픽셀 색 추출 → 배경색 목록에 추가
  const handleImageClick = (e) => {
    if (tool !== 'bg') return;
    if (!sourceCanvasRef.current || !imgDimensions.w) return;
    // 컨테이너 좌표 → 원본 이미지 좌표
    const rect = containerRef.current.getBoundingClientRect();
    // 이미지가 object-contain이라 실제 표시 영역 계산
    const containerRatio = rect.width / rect.height;
    const imageRatio = imgDimensions.w / imgDimensions.h;
    let displayW, displayH, offsetX, offsetY;
    if (imageRatio > containerRatio) {
      displayW = rect.width;
      displayH = rect.width / imageRatio;
      offsetX = 0;
      offsetY = (rect.height - displayH) / 2;
    } else {
      displayH = rect.height;
      displayW = rect.height * imageRatio;
      offsetX = (rect.width - displayW) / 2;
      offsetY = 0;
    }
    const point = e.touches ? e.touches[0] : e;
    const localX = point.clientX - rect.left - offsetX;
    const localY = point.clientY - rect.top - offsetY;
    if (localX < 0 || localY < 0 || localX > displayW || localY > displayH) return;
    const imgX = Math.floor((localX / displayW) * imgDimensions.w);
    const imgY = Math.floor((localY / displayH) * imgDimensions.h);
    const data = sourceCanvasRef.current.getContext('2d').getImageData(imgX, imgY, 1, 1).data;
    const newColor = { r: data[0], g: data[1], b: data[2] };
    // 비슷한 색이 이미 있으면 추가 안 함
    const exists = bgColors.some(c => {
      const dr = c.r - newColor.r, dg = c.g - newColor.g, db = c.b - newColor.b;
      return Math.sqrt(dr*dr + dg*dg + db*db) < 15;
    });
    if (exists) return;
    setHistory(prev => [...prev, bgColors]);
    setBgColors(prev => [...prev, newColor]);
  };

  // 크롭 드래그 핸들러
  const onCropMouseDown = (e, mode = 'move') => {
    e.stopPropagation();
    e.preventDefault();
    if (!containerRef.current || !imgDimensions.w) return;
    const rect = containerRef.current.getBoundingClientRect();
    setIsDraggingCrop(true);
    setDragMode(mode);
    const point = e.touches ? e.touches[0] : e;
    setDragStart({
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
      crop: { ...crop },
      rectW: rect.width,
      rectH: rect.height,
    });
  };

  const onMouseMove = (e) => {
    if (!isDraggingCrop || !dragStart) return;
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = point.clientX - rect.left;
    const currentY = point.clientY - rect.top;
    const dx = (currentX - dragStart.x) / dragStart.rectW;
    const dy = (currentY - dragStart.y) / dragStart.rectH;

    if (dragMode === 'move') {
      const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
      const cropPxSize = dragStart.crop.size * shortSide;
      const cropWRatio = cropPxSize / imgDimensions.w;
      const cropHRatio = cropPxSize / imgDimensions.h;
      let newX = Math.max(0, Math.min(dragStart.crop.x + dx, 1 - cropWRatio));
      let newY = Math.max(0, Math.min(dragStart.crop.y + dy, 1 - cropHRatio));
      setCrop({ ...dragStart.crop, x: newX, y: newY });
    } else if (dragMode === 'resize-br') {
      const delta = Math.max(dx, dy);
      let newSize = Math.max(0.1, Math.min(1, dragStart.crop.size + delta));
      const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
      const cropPxSize = newSize * shortSide;
      const cropWRatio = cropPxSize / imgDimensions.w;
      const cropHRatio = cropPxSize / imgDimensions.h;
      let newX = dragStart.crop.x;
      let newY = dragStart.crop.y;
      if (newX + cropWRatio > 1) newX = Math.max(0, 1 - cropWRatio);
      if (newY + cropHRatio > 1) newY = Math.max(0, 1 - cropHRatio);
      setCrop({ x: newX, y: newY, size: newSize });
    }
  };

  const onMouseUp = () => {
    setIsDraggingCrop(false);
    setDragStart(null);
  };

  useEffect(() => {
    if (!isDraggingCrop) return;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove, { passive: false });
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDraggingCrop, dragStart]);

  const handleSave = async () => {
    setProcessing(true);
    try {
      const canvas = previewCanvasRef.current;
      if (!canvas) { onClose(); return; }
      // 배경 제거가 있으면 PNG (투명도 유지), 아니면 JPEG
      const mime = bgColors.length > 0 ? 'image/png' : 'image/jpeg';
      const quality = bgColors.length > 0 ? undefined : 0.92;
      const result = canvas.toDataURL(mime, quality);
      onSave({ ...card, image: result });
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    // 크롭 + 배경 제거 모두 초기화
    if (imgDimensions.w >= imgDimensions.h) {
      const xRatio = (imgDimensions.w - imgDimensions.h) / 2 / imgDimensions.w;
      setCrop({ x: xRatio, y: 0, size: imgDimensions.h / imgDimensions.w });
    } else {
      const yRatio = (imgDimensions.h - imgDimensions.w) / 2 / imgDimensions.h;
      setCrop({ x: 0, y: yRatio, size: imgDimensions.w / imgDimensions.h });
    }
    setBgColors([]);
    setHistory([]);
  };

  const restoreOriginal = () => {
    if (!safeConfirm('편집을 모두 취소하고 처음 업로드한 상태로 돌아갈까요?')) return;
    onSave({ ...card, image: card.originalImage || card.image });
  };

  const undoBgColor = () => {
    if (history.length === 0) return;
    setBgColors(history[history.length - 1]);
    setHistory(prev => prev.slice(0, -1));
  };

  // 크롭 박스 표시 스타일
  const cropOverlayStyle = (() => {
    if (!imgDimensions.w) return { display: 'none' };
    const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
    const cropPxSize = crop.size * shortSide;
    return {
      left: `${crop.x * 100}%`,
      top: `${crop.y * 100}%`,
      width: `${(cropPxSize / imgDimensions.w) * 100}%`,
      height: `${(cropPxSize / imgDimensions.h) * 100}%`,
    };
  })();

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">이미지 편집</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* 도구 탭 */}
        <div className="px-4 sm:px-5 pt-3 flex items-center gap-1.5 border-b border-stone-100 pb-3">
          <button
            onClick={() => setTool('crop')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tool === 'crop'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Crop className="w-3.5 h-3.5" />
            자르기
          </button>
          <button
            onClick={() => setTool('bg')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tool === 'bg'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            배경 제거
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 좌측: 원본 + 크롭 / 배경 클릭 */}
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
              {tool === 'crop' ? '원본 (드래그로 자르기)' : '원본 (없앨 배경 클릭)'}
            </div>
            <div
              ref={containerRef}
              className={`relative bg-stone-100 rounded-lg overflow-hidden select-none ${tool === 'bg' ? 'cursor-crosshair' : ''}`}
              style={{ aspectRatio: imgDimensions.w ? `${imgDimensions.w} / ${imgDimensions.h}` : '1 / 1' }}
              onClick={tool === 'bg' ? handleImageClick : undefined}
            >
              <img
                ref={imgRef}
                src={sourceImage}
                alt="원본"
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
              {/* 자르기 모드: 크롭 박스 */}
              {tool === 'crop' && (
                <>
                  <div className="absolute inset-0 bg-stone-900/40 pointer-events-none" />
                  <div
                    className="absolute border-2 border-amber-400 cursor-move bg-transparent"
                    style={cropOverlayStyle}
                    onMouseDown={(e) => onCropMouseDown(e, 'move')}
                    onTouchStart={(e) => onCropMouseDown(e, 'move')}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={sourceImage}
                        alt=""
                        className="pointer-events-none absolute"
                        draggable={false}
                        style={{
                          width: `${(1 / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.w)) * 100}%`,
                          height: `${(1 / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.h)) * 100}%`,
                          left: `${-(crop.x / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.w)) * 100}%`,
                          top: `${-(crop.y / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.h)) * 100}%`,
                          maxWidth: 'none',
                        }}
                      />
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 bg-amber-400 border-2 border-white rounded-full cursor-nwse-resize translate-x-1/2 translate-y-1/2"
                      onMouseDown={(e) => onCropMouseDown(e, 'resize-br')}
                      onTouchStart={(e) => onCropMouseDown(e, 'resize-br')}
                    />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/50" />
                      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/50" />
                      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/50" />
                      <div className="absolute top-2/3 left-0 right-0 h-px bg-white/50" />
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="text-[10px] text-stone-500 mt-1 text-center">
              {tool === 'crop'
                ? '박스 안쪽 드래그: 이동 · 우하단 점: 크기 조절'
                : '없앨 배경 색깔을 클릭하세요 · 여러 번 클릭 가능'}
            </p>
          </div>

          {/* 우측: 결과 미리보기 + 컨트롤 */}
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">미리보기 (실제 카드)</div>
            <div className="bg-stone-100 rounded-lg overflow-hidden aspect-square">
              <canvas ref={previewCanvasRef} className="w-full h-full" />
            </div>

            {/* 배경 제거 모드일 때만 슬라이더 표시 */}
            {tool === 'bg' && (
              <div className="mt-4 space-y-3">
                {/* 선택된 배경색들 */}
                {bgColors.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-stone-600 mb-1.5">선택된 색 ({bgColors.length}개)</div>
                    <div className="flex flex-wrap gap-1 items-center">
                      {bgColors.map((c, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded border-2 border-white shadow-sm"
                          style={{ backgroundColor: `rgb(${c.r},${c.g},${c.b})` }}
                          title={`RGB(${c.r}, ${c.g}, ${c.b})`}
                        />
                      ))}
                      <button
                        onClick={undoBgColor}
                        disabled={history.length === 0}
                        className="ml-1 px-2 py-1 text-[10px] font-medium text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed border border-stone-200 rounded"
                        title="마지막 선택 취소"
                      >
                        ↶ 되돌리기
                      </button>
                      <button
                        onClick={() => { setHistory(prev => [...prev, bgColors]); setBgColors([]); }}
                        disabled={bgColors.length === 0}
                        className="px-2 py-1 text-[10px] font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed border border-red-200 rounded"
                      >
                        모두 지우기
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-stone-600">허용 범위</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">{bgTolerance}</span>
                  </div>
                  <input
                    type="range" min="5" max="100" value={bgTolerance}
                    onChange={(e) => setBgTolerance(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[9px] text-stone-400 mt-0.5">
                    <span>정확하게</span>
                    <span>넓게</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-stone-600">경계 부드러움</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">{bgFeather}</span>
                  </div>
                  <input
                    type="range" min="0" max="30" value={bgFeather}
                    onChange={(e) => setBgFeather(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[9px] text-stone-400 mt-0.5">
                    <span>날카롭게</span>
                    <span>자연스럽게</span>
                  </div>
                </div>

                {bgColors.length === 0 && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 leading-snug">
                    💡 왼쪽 이미지에서 없애고 싶은 배경 색깔을 클릭하세요
                  </p>
                )}
              </div>
            )}

            {tool === 'crop' && (
              <div className="mt-4 text-[10px] text-stone-500 leading-relaxed bg-stone-50 rounded px-2 py-2">
                💡 자르기는 정사각형으로만 가능합니다. <br/>
                카드 비율에 맞춰 출력됩니다.
              </div>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-4 sm:px-5 py-3 border-t border-stone-200 flex items-center justify-between gap-2 rounded-b-2xl bg-stone-50 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-[11px] font-medium rounded transition"
              title="크롭+배경 제거 초기화"
            >
              <RefreshCw className="w-3 h-3 inline mr-1" />
              초기화
            </button>
            {card.originalImage && card.originalImage !== card.image && (
              <button
                onClick={restoreOriginal}
                className="px-2.5 py-1.5 bg-white border border-stone-200 hover:bg-blue-50 hover:border-blue-200 text-blue-600 text-[11px] font-medium rounded transition"
                title="처음 업로드한 상태로"
              >
                원본 복원
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-lg transition"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={processing}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {processing ? '처리 중...' : '적용'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 첫 사용 튜토리얼
// ─────────────────────────────────────────────────────────────
const TutorialOverlay = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      icon: ImageIcon,
      title: '환영합니다! 👋',
      desc: '검단ABA AAC maker는 ABA 치료에 사용할 카드를 쉽게 만들 수 있는 도구예요. 그림과 글자가 들어간 카드를 PDF로 출력하면 됩니다.',
    },
    {
      icon: Upload,
      title: '1. 이미지 올리기',
      desc: '메인 화면 위쪽 영역에 이미지를 끌어다 놓거나 클릭해서 선택하세요. 한 번에 여러 장 가능해요. 파일명이 자동으로 라벨이 됩니다.',
    },
    {
      icon: Type,
      title: '2. 글자 입력',
      desc: '각 카드 아래 입력칸에 글자를 입력하세요. 그림을 보면서 바로 옆에 글자를 쓸 수 있어 편해요.',
    },
    {
      icon: Settings2,
      title: '3. 카드 설정',
      desc: '왼쪽 사이드바에서 카드 크기 (50/45/40/30mm), 글자 위치, 글씨체, 자르는 선 등을 조절할 수 있어요.',
    },
    {
      icon: GripVertical,
      title: '4. 카드 정리',
      desc: '카드를 드래그해서 순서를 바꿀 수 있어요. 카드에 마우스를 올리면 회전(↻)/뒤집기 버튼도 나옵니다.',
    },
    {
      icon: Folder,
      title: '5. 카테고리 (선택)',
      desc: '"동물 / 음식 / 행동" 같은 카테고리를 만들고 카드를 분류할 수 있어요. 사이드바의 카테고리 버튼에서 관리합니다.',
    },
    {
      icon: FileDown,
      title: '6. PDF로 출력',
      desc: '인쇄판에서 "인쇄 / PDF 저장" 버튼을 누르면 인쇄 대화상자가 열립니다. 인쇄 대상에서 "PDF로 저장"을 선택하면 끝! (미리 확인하려면 상단 "인쇄 미리보기" 탭)',
    },
    {
      icon: History,
      title: '7. 이전 인쇄 묶음',
      desc: '인쇄한 카드 묶음은 자동으로 사이드바 "이전 인쇄 묶음"에 저장돼요. 다음에 같은 묶음 다시 쓸 때 [추가] 버튼 한 번이면 됩니다.',
    },
    {
      icon: Share2,
      title: '8. 다른 선생님과 공유',
      desc: '내 카드 묶음을 .json 파일로 내보내서 카톡으로 동료에게 보낼 수 있어요. 받은 분은 "묶음 불러오기" 버튼으로 추가하면 끝!',
    },
  ];

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[60] bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        <div className="bg-gradient-to-br from-amber-100 via-rose-50 to-orange-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-4">
            <Icon className="w-7 h-7 text-amber-700" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-2">{current.title}</h2>
          <p className="text-sm text-stone-700 leading-relaxed">{current.desc}</p>
        </div>

        {/* 진행 표시 */}
        <div className="px-6 pt-4 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-amber-500' : i < step ? 'w-1.5 bg-amber-300' : 'w-1.5 bg-stone-200'
              }`}
            />
          ))}
        </div>

        <div className="p-5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-stone-500 hover:text-stone-700 px-3 py-1.5 rounded transition"
          >
            건너뛰기
          </button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition"
              >
                이전
              </button>
            )}
            <button
              onClick={() => isLast ? onClose() : setStep(step + 1)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            >
              {isLast ? '시작하기' : '다음'}
              {!isLast && <ArrowRight className="w-3 h-3" />}
            </button>
          </div>
        </div>

        <div className="px-5 pb-3 text-center">
          <span className="text-[10px] text-stone-400">{step + 1} / {steps.length}</span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────────────────────
// =====================================================================
// 말하는 판 (누르면 소리로 말하는 AAC 놀이판)
//  - 판 저장: aac_data 'aac_board:{id}' (본인 계정, RLS)
//  - 아이 목록: aac_data 'aac_board_kids'
//  - 그림: 기존 카테고리(보관함) 카드 사용. 칩판 넣기로 잘라 새 카테고리에 저장
// =====================================================================
const BOARD_PREFIX = 'aac_board:';
const BOARD_KIDS_KEY = 'aac_board_kids';
// 기본 판: Supabase aac_shared 표 (로그인한 선생님은 보기만, 올리기·지우기는 관리자만 — RLS)
//   'board_index' = [{ id, name, group, cols, count }],  'board:{id}' = { id, name, group, cols, cells:[{label,image}] }
// 아이별 칸 숨기기는 계정마다 aac_data 'aac_board_hidden:{id}'
const BUILTIN_HIDDEN_PREFIX = 'aac_board_hidden:';
const SHARED_INDEX_KEY = 'board_index';
const SHARED_BOARD_KEY = (id) => `board:${id}`;
async function sharedGet(key) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/aac_shared?key=eq.${encodeURIComponent(key)}&select=value`, { headers });
    if (!r.ok) return { error: true };
    const rows = await r.json();
    return { value: rows?.[0]?.value ?? null };
  } catch (e) { return { error: true }; }
}
async function sharedSet(key, value) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/aac_shared?on_conflict=key`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
    });
    return r.ok;
  } catch (e) { return false; }
}
async function sharedDeleteLike(prefix) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/aac_shared?key=like.${encodeURIComponent(prefix)}*`, { method: 'DELETE', headers });
    return r.ok;
  } catch (e) { return false; }
}
async function sharedDelete(key) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/aac_shared?key=eq.${encodeURIComponent(key)}`, { method: 'DELETE', headers });
    return r.ok;
  } catch (e) { return false; }
}

// ----- 기본 판 영상: 로그인한 선생님 모두가 보는 잠긴 저장 공간(aac-shared-media) -----
const SHARED_MEDIA_BUCKET = 'aac-shared-media';
const SHARED_MEDIA_TTL = 3600;
async function sharedMediaUpload(path, file) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${SHARED_MEDIA_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`, {
      method: 'POST',
      headers: { apikey: headers.apikey, Authorization: headers.Authorization, 'Content-Type': file.type || 'video/mp4', 'x-upsert': 'true' },
      body: file,
    });
    return r.ok;
  } catch (e) { devWarn('기본 판 영상 올리기 실패:', e); return false; }
}
const _sharedMediaCache = new Map();
async function sharedMediaSign(paths) {
  const now = Date.now(), out = {}, need = [];
  for (const p of [...new Set((paths || []).filter(Boolean))]) {
    const hit = _sharedMediaCache.get(p);
    if (hit && hit.exp > now) out[p] = hit.url; else need.push(p);
  }
  if (!need.length) return out;
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/${SHARED_MEDIA_BUCKET}`, {
      method: 'POST', headers, body: JSON.stringify({ expiresIn: SHARED_MEDIA_TTL, paths: need }),
    });
    if (!r.ok) return out;
    const list = await r.json();
    (Array.isArray(list) ? list : []).forEach(o => {
      const rel = o && (o.signedURL || o.signedUrl);
      if (o && o.path && rel) {
        const url = /^https?:/.test(rel) ? rel : `${SUPABASE_URL}/storage/v1${rel.startsWith('/') ? '' : '/'}${rel}`;
        out[o.path] = url;
        _sharedMediaCache.set(o.path, { url, exp: now + (SHARED_MEDIA_TTL - 300) * 1000 });
      }
    });
  } catch (e) { devWarn('기본 판 영상 주소 받기 실패:', e); }
  return out;
}

// ----- 자료실: 평가지·안내문 PDF (로그인한 선생님은 열기만, 올리기·지우기는 관리자만) -----
//   목록은 aac_shared 'library_index', 파일은 aac-shared-media 'library/{id}.pdf'
const LIBRARY_INDEX_KEY = 'library_index';
async function sharedMediaRemove(path) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${SHARED_MEDIA_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`, {
      method: 'DELETE', headers: { apikey: headers.apikey, Authorization: headers.Authorization },
    });
    return r.ok;
  } catch (e) { return false; }
}
const fmtSize = (n) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)}MB` : `${Math.max(1, Math.round(n / 1024))}KB`);
function LibraryModal({ isAdmin, onClose }) {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const load = useCallback(async () => {
    const r = await sharedGet(LIBRARY_INDEX_KEY);
    if (r.error) { setErr('자료 목록을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.'); setItems([]); return; }
    let list = [];
    try { list = r.value ? JSON.parse(r.value) : []; } catch { list = []; }
    setItems(Array.isArray(list) ? list : []);
  }, []);
  useEffect(() => { load(); }, [load]);
  const openItem = async (it) => {
    const w = window.open('', '_blank');
    const urls = await sharedMediaSign([it.path]);
    const url = urls[it.path];
    if (!url) { if (w) w.close(); safeAlert('파일을 열지 못했어요. 잠시 뒤에 다시 해 주세요.'); return; }
    if (w) w.location.href = url; else window.location.href = url;
  };
  const pick = (f) => {
    if (!f) return;
    if (!/pdf$/i.test(f.type) && !/\.pdf$/i.test(f.name)) { safeAlert('PDF 파일만 올릴 수 있어요.'); return; }
    if (f.size > 50 * 1048576) { safeAlert('50MB보다 큰 파일은 올릴 수 없어요.'); return; }
    setFile(f);
    if (!name) setName(f.name.normalize('NFC').replace(/\.pdf$/i, ''));
  };
  const upload = async () => {
    if (!file || !name.trim() || !src.trim()) return;
    setBusy(true);
    const id = 'lib_' + Date.now();
    const path = `library/${id}.pdf`;
    const ok = await sharedMediaUpload(path, new File([file], `${id}.pdf`, { type: 'application/pdf' }));
    if (!ok) {
      setBusy(false);
      safeAlert('올리지 못했어요.\nSupabase에 "자료실 PDF 받기" 설정을 먼저 붙여 넣었는지, 관리자 계정으로 로그인했는지 확인해 주세요.');
      return;
    }
    const d = new Date();
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const next = [...(items || []), { id, name: name.trim(), src: src.trim(), path, size: file.size, date }];
    const saved = await sharedSet(LIBRARY_INDEX_KEY, JSON.stringify(next));
    setBusy(false);
    if (!saved) { await sharedMediaRemove(path); safeAlert('목록에 넣지 못했어요. 다시 해 주세요.'); return; }
    setItems(next); setFile(null); setName(''); setSrc('');
    if (fileRef.current) fileRef.current.value = '';
  };
  const remove = async (it) => {
    if (!safeConfirm(`'${it.name}'을(를) 자료실에서 지울까요?\n지우면 되돌릴 수 없어요.`)) return;
    const next = (items || []).filter(x => x.id !== it.id);
    const saved = await sharedSet(LIBRARY_INDEX_KEY, JSON.stringify(next));
    if (!saved) { safeAlert('지우지 못했어요. 다시 해 주세요.'); return; }
    await sharedMediaRemove(it.path);
    setItems(next);
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start sm:items-center justify-center p-3 overflow-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-4 space-y-3" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="자료실">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5" style={{ color: BOARD_PINK }} />
          <h3 className="font-bold text-stone-900 text-lg">자료실</h3>
          <button onClick={onClose} className="ml-auto p-1 text-stone-400 hover:text-stone-700" aria-label="닫기"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-stone-500">평가지·안내문처럼 센터에서 같이 쓰는 파일이에요. 열기를 누르면 새 창에서 열리고, 거기서 인쇄하면 돼요.</p>
        {err && <p className="text-sm text-red-600">{err}</p>}
        {items === null ? <p className="text-sm text-stone-400">불러오는 중이에요…</p> : (
          items.length === 0 ? <p className="text-sm text-stone-400">아직 올린 자료가 없어요.</p> : (
            <div className="space-y-2">
              {items.map(it => (
                <div key={it.id} className="flex items-center gap-3 border border-stone-200 rounded-xl p-2.5">
                  <span className="w-10 h-12 rounded-md flex items-center justify-center text-xs font-black flex-none border border-stone-200" style={{ background: '#FDEEF2', color: BOARD_PINK }}>PDF</span>
                  <span className="flex-1 min-w-0">
                    <b className="block text-stone-800 break-words">{it.name}</b>
                    <span className="text-xs text-stone-500">출처: {it.src} · {fmtSize(it.size || 0)} · {it.date} 올림</span>
                  </span>
                  <button onClick={() => openItem(it)} className="rounded-full px-3.5 py-1.5 text-sm font-bold text-white flex-none" style={{ background: BOARD_PINK }}>열기</button>
                  {isAdmin && <button onClick={() => remove(it)} className="rounded-full px-2.5 py-1 text-xs border border-stone-200 text-red-600 flex-none">지우기</button>}
                </div>
              ))}
            </div>
          )
        )}
        {isAdmin && (
          <div className="rounded-xl border-2 border-dashed p-3 space-y-2" style={{ borderColor: BOARD_PINK }}>
            <b className="text-sm text-stone-800">자료 올리기 (관리자만)</b>
            <label className="block text-xs font-bold text-stone-600">파일 (PDF, 50MB까지)
              <input ref={fileRef} type="file" accept="application/pdf,.pdf" onChange={(e) => pick(e.target.files?.[0])} className="block w-full mt-1 text-sm" />
            </label>
            <div className="flex gap-2 flex-wrap">
              <label className="flex-1 min-w-[160px] text-xs font-bold text-stone-600">이름
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 초기 평가지" className="block w-full mt-1 border border-stone-300 rounded-lg px-2 py-1.5 text-sm font-normal" />
              </label>
              <label className="flex-1 min-w-[160px] text-xs font-bold text-stone-600">출처 (꼭 적어 주세요)
                <input value={src} onChange={(e) => setSrc(e.target.value)} placeholder="예: SLP 자몽 (@slp_grapefruit)" className="block w-full mt-1 border border-stone-300 rounded-lg px-2 py-1.5 text-sm font-normal" />
              </label>
            </div>
            <button onClick={upload} disabled={busy || !file || !name.trim() || !src.trim()}
              className="rounded-full px-4 py-1.5 text-sm font-bold text-white disabled:opacity-40" style={{ background: BOARD_PINK }}>{busy ? '올리는 중…' : '올리기'}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 판 고르기 창에 보일 작은 그림 (올릴 때 한 번 만들어 목록에 같이 저장)
function makeThumb(src, size = 72) {
  return new Promise((resolve) => {
    if (!src || !/^data:image\//.test(src)) { resolve(''); return; }
    const im = new Image();
    im.onload = () => {
      try {
        const c = document.createElement('canvas'); c.width = size; c.height = size;
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, size, size);
        const s = Math.min(size / im.width, size / im.height);
        const w = im.width * s, h = im.height * s;
        g.drawImage(im, (size - w) / 2, (size - h) / 2, w, h);
        resolve(c.toDataURL('image/jpeg', 0.7));
      } catch { resolve(''); }
    };
    im.onerror = () => resolve('');
    im.src = src;
  });
}
// ----- 기본 판 올리기 창 (관리자 전용) -----
const BuiltinUploadModal = ({ count, onDone, onClose }) => {
  const [busy, setBusy] = useState('');
  const fileRef = useRef(null);
  const onFile = async (e) => {
    const picked = Array.from(e.target.files || []);
    e.target.value = '';
    if (!picked.length) return;
    const f = picked.find(x => /\.json$/i.test(x.name) || x.type === 'application/json');
    if (!f) { safeAlert('기본 판 파일(aac-builtin-boards.json)도 같이 골라 주세요.'); return; }
    const vidFiles = {};
    const nfc = (s) => { try { return String(s || '').normalize('NFC'); } catch { return String(s || ''); } };
    picked.filter(x => x !== f && isVideoFile(x)).forEach(x => { vidFiles[nfc(x.name)] = x; });
    let data = null;
    try { data = JSON.parse(await f.text()); } catch { data = null; }
    const list = (data?.boards || []).filter(b => b && b.id && b.name && Array.isArray(b.cells));
    if (!list.length) { safeAlert('기본 판 파일이 아니에요. 받아 둔 aac-builtin-boards.json 파일을 골라 주세요.'); return; }
    // 영상이 들어가는 쪽: 고른 영상 파일을 함께 쓰는 잠긴 저장 공간에 올림
    const vidJobs = [];
    // 저장 이름은 영어·숫자만 (한글 파일 이름은 저장 공간이 받지 않음)
    list.forEach(b => (b.pages || []).forEach((pg, pi) => {
      if (!pg || !pg.videoFile) return;
      const ext = ((String(pg.videoFile).match(/\.([a-z0-9]{2,4})$/i) || [])[1] || 'mp4').toLowerCase();
      vidJobs.push({ b, pg, path: `builtin/${String(b.id).replace(/[^a-zA-Z0-9_-]/g, '_')}/page${pi + 1}.${ext}` });
    }));
    let vidMissing = 0, vidFail = 0;
    for (let i = 0; i < vidJobs.length; i++) {
      const j = vidJobs[i];
      const vf = vidFiles[nfc(j.pg.videoFile)];
      if (!vf) { vidMissing++; continue; }
      setBusy(`영상 ${i + 1}/${vidJobs.length}개 올리는 중`);
      if (!(await sharedMediaUpload(j.path, vf))) vidFail++;
    }
    if (vidJobs.length && vidFail === vidJobs.length - vidMissing && vidFail > 0) {
      setBusy('');
      safeAlert('영상을 올리지 못했어요.\nSupabase에 영상 저장 공간을 만드는 SQL을 먼저 실행했는지 확인해 주세요. 이 화면을 캡처해서 Claude에게 보여 주세요.');
      return;
    }
    vidJobs.forEach(j => { j.pg.sharedVideo = j.path; delete j.pg.videoFile; });
    setBusy('올리는 중…');
    let fail = 0;
    for (let i = 0; i < list.length; i++) {
      setBusy(`${i + 1}/${list.length}개 올리는 중`);
      const b = list[i];
      const ok = await sharedSet(SHARED_BOARD_KEY(b.id), JSON.stringify({ id: b.id, name: b.name, group: b.group || '기본 판', cols: b.cols || 4, cells: b.cells,
        ...(b.kind === 'story' ? { kind: 'story', pages: b.pages || [], sentence: b.sentence !== false } : (typeof b.sentence === 'boolean' ? { sentence: b.sentence } : {})),
        ...(Array.isArray(b.cellSets) && b.cellSets.length ? { cellSets: b.cellSets, cellSetDefault: b.cellSetDefault || 0 } : {}),
        ...(b.sort ? { sort: true, ...(Array.isArray(b.sortDefault) ? { sortDefault: b.sortDefault } : {}) } : {}),
        ...(b.kinds ? { kinds: b.kinds } : {}),
        ...(b.frame ? { frame: b.frame, frameFixed: b.frameFixed || {}, frameWho: b.frameWho || [] } : {}) }));
      if (!ok) fail++;
    }
    if (fail === list.length) {
      setBusy('');
      safeAlert('올리지 못했어요.\nSupabase에 aac_shared 표를 만드는 SQL을 먼저 실행했는지, 관리자 계정으로 로그인했는지 확인해 주세요.');
      return;
    }
    // unlisted: 목록에는 안 보이고 다른 판의 '답 칸 그림'으로만 쓰는 판
    setBusy('판 그림 만드는 중…');
    const byId = Object.fromEntries(list.map(b => [b.id, b]));
    const firstImg = (b) => {
      if (b.kind === 'story') { const pg = (b.pages || []).find(x => x && x.image && /^data:image/.test(x.image)); if (pg) return pg.image; }
      for (const c of (b.cells || [])) {
        if (c && c.image && /^data:image/.test(c.image)) return c.image;
        if (c && c.ref) { const [rid, ri] = String(c.ref).split('#'); const rc = byId[rid]?.cells?.[parseInt(ri, 10)]; if (rc && rc.image) return rc.image; }
      }
      return '';
    };
    const thumbs = {};
    for (const b of list) { if (!b.unlisted) thumbs[b.id] = await makeThumb(firstImg(b)); }
    const index = list.map(b => ({ id: b.id, name: b.name, group: b.group || '기본 판', cols: b.cols || 4, count: b.cells.length, ...(b.kind === 'story' ? { kind: 'story' } : {}), ...(b.unlisted ? { unlisted: true } : {}),
      ...(thumbs[b.id] ? { thumb: thumbs[b.id] } : {}),
      ...((b.pages || []).some(pg => Array.isArray(pg?.answer) && pg.answer.length) ? { ans: true } : {}),
      ...((b.pages || []).some(pg => pg && (pg.sharedVideo || pg.videoFile)) ? { vid: true } : {}) }));
    // 새 파일에 없는 예전 판은 지움
    const ids = new Set(list.map(b => b.id));
    const prev = await sharedGet(SHARED_INDEX_KEY);
    try { for (const o of (JSON.parse(prev.value || '[]') || [])) if (o && o.id && !ids.has(o.id)) await sharedDelete(SHARED_BOARD_KEY(o.id)); } catch {}
    const okIdx = await sharedSet(SHARED_INDEX_KEY, JSON.stringify(index));
    setBusy('');
    if (!okIdx) { safeAlert('판 목록을 저장하지 못했어요. 다시 시도해 주세요.'); return; }
    safeAlert(`기본 판 ${list.filter(b => !b.unlisted).length - fail}개를 올렸어요.` + (fail ? `\n${fail}개는 올라가지 않았어요. 다시 올려 주세요.` : '')
      + (vidJobs.length ? `\n영상 ${vidJobs.length - vidMissing - vidFail}개를 올렸어요.` : '')
      + (vidMissing ? `\n영상 ${vidMissing}개는 고르지 않았어요. 예전에 올린 영상이 있으면 그대로 나와요.` : '')
      + (vidFail ? `\n영상 ${vidFail}개는 올라가지 않았어요. 다시 올려 주세요.` : ''));
    onDone();
  };
  const removeAll = async () => {
    if (!safeConfirm('기본 판을 모두 내릴까요?\n모든 선생님 화면에서 기본 판이 사라져요. (내 판으로 복사한 판의 그림도 안 보이게 돼요)')) return;
    setBusy('내리는 중…');
    const a = await sharedDeleteLike('board:');
    const b = await sharedDelete(SHARED_INDEX_KEY);
    setBusy('');
    if (!a || !b) { safeAlert('내리지 못했어요. 다시 시도해 주세요.'); return; }
    safeAlert('기본 판을 모두 내렸어요.');
    onDone();
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3" onClick={() => !busy && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <h3 className="font-bold text-stone-900">기본 판 올리기</h3>
          {!busy && <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" aria-label="닫기"><X className="w-5 h-5" /></button>}
        </div>
        {busy ? (
          <div className="p-10 text-center text-stone-600">
            <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin mx-auto mb-3" />{busy}
          </div>
        ) : (
          <div className="p-5 space-y-3">
            <p className="text-sm text-stone-600 leading-relaxed">받아 둔 기본 판 파일(aac-builtin-boards.json)을 고르면 잠긴 저장 공간에 올라가요. 로그인한 선생님만 볼 수 있고, 다시 올리면 기본 판이 새 파일 내용으로 바뀌어요.</p>
            <p className="text-sm text-stone-600 leading-relaxed">영상이 들어가는 판이 있으면, 같은 폴더의 <b>영상 파일도 함께</b> 골라 주세요. (폴더 안 파일을 모두 고르면 돼요)</p>
            <p className="text-sm text-stone-800">지금 올라가 있는 기본 판: <b>{count}개</b></p>
            <input ref={fileRef} type="file" accept="application/json,.json,video/*,.mp4,.mov,.m4v,.webm" multiple className="hidden" onChange={onFile} />
            <div className="flex justify-between gap-2 pt-1">
              <button onClick={removeAll} disabled={!count} className="px-3 py-2 rounded-lg border border-stone-300 text-sm text-red-600 disabled:opacity-40">기본 판 모두 내리기</button>
              <button onClick={() => fileRef.current?.click()} className="px-4 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-1.5" style={{ background: BOARD_PINK }}>
                <Upload className="w-4 h-4" /> 파일 고르기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const BOARD_PINK = '#D4728A';

// ----- 소리로 말하기 -----
const boardSpeak = (text, rate) => {
  try {
    const ss = window.speechSynthesis;
    if (!ss || typeof window.SpeechSynthesisUtterance === 'undefined') return false;
    ss.cancel();
    const u = new window.SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate || 0.9;
    // 목소리·높낮이: 이 기기에서 고른 것 (판 관리 → 목소리)
    let want = '', pitch = 1;
    try { want = localStorage.getItem('aac_board_voice') || ''; const pv = parseFloat(localStorage.getItem('aac_board_pitch')); if (pv >= 0.5 && pv <= 2) pitch = pv; } catch {}
    u.pitch = pitch;
    const kos = (ss.getVoices() || []).filter(x => /^ko/i.test(x.lang || ''));
    const v = (want && kos.find(x => x.name === want)) || kos[0];
    if (v) u.voice = v;
    ss.speak(u);
    return true;
  } catch (e) { return false; }
};

// ----- 목소리 고르기 창 -----
const VoiceModal = ({ rate, setRate, onClose }) => {
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(() => { try { return localStorage.getItem('aac_board_voice') || ''; } catch { return ''; } });
  const [pitch, setPitch] = useState(() => { try { const v = parseFloat(localStorage.getItem('aac_board_pitch')); return v >= 0.5 && v <= 2 ? v : 1; } catch { return 1; } });
  useEffect(() => {
    const ss = window.speechSynthesis;
    if (!ss) return;
    const load = () => setVoices((ss.getVoices() || []).filter(x => /^ko/i.test(x.lang || '')));
    load();
    try { ss.addEventListener('voiceschanged', load); } catch {}
    return () => { try { ss.removeEventListener('voiceschanged', load); } catch {} };
  }, []);
  useEffect(() => { try { localStorage.setItem('aac_board_voice', voice); } catch {} }, [voice]);
  useEffect(() => { try { localStorage.setItem('aac_board_pitch', String(pitch)); } catch {} }, [pitch]);
  const sample = () => { if (!boardSpeak('안녕하세요. 오늘 기분이 어때요?', rate)) safeAlert('이 브라우저에서는 소리로 읽기를 쓸 수 없어요.'); };
  const cur = voice && voices.some(v => v.name === voice) ? voice : (voices[0]?.name || '');
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <h3 className="font-bold text-stone-900 flex items-center gap-1.5"><Volume2 className="w-5 h-5" /> 목소리</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" aria-label="닫기"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4 text-sm">
          <div className="space-y-1.5">
            <div className="font-bold text-stone-700">목소리 고르기</div>
            {voices.length ? (
              <div className="space-y-1.5 max-h-56 overflow-auto">
                {voices.map(v => (
                  <label key={v.name} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${cur === v.name ? 'bg-pink-50' : 'border-stone-200'}`}
                    style={cur === v.name ? { borderColor: BOARD_PINK } : undefined}>
                    <input type="radio" name="aacvoice" checked={cur === v.name} onChange={() => { setVoice(v.name); setTimeout(sample, 50); }} />
                    <span className="flex-1">{String(v.name || '한국어 목소리').replace(/^Microsoft\s*/i, '').replace(/\s*-\s*Korean.*$/i, '').replace(/Online \(Natural\)/i, '(자연스러운 목소리)')}</span>
                    {!v.localService && <span className="text-[11px] text-stone-400">인터넷 필요</span>}
                  </label>
                ))}
              </div>
            ) : <p className="text-stone-500">이 기기에는 고를 수 있는 한국어 목소리가 하나뿐이에요.</p>}
          </div>
          <label className="block space-y-1">
            <div className="flex justify-between"><span className="font-bold text-stone-700">높낮이</span><span className="text-stone-500">{pitch < 0.95 ? '낮게' : pitch > 1.05 ? '높게' : '보통'}</span></div>
            <input type="range" min="0.6" max="1.6" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full" />
          </label>
          <label className="block space-y-1">
            <div className="flex justify-between"><span className="font-bold text-stone-700">빠르기</span><span className="text-stone-500">{rate < 0.85 ? '천천히' : rate > 1.05 ? '빠르게' : '보통'}</span></div>
            <input type="range" min="0.5" max="1.3" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full" />
          </label>
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs text-stone-400">고른 목소리는 이 기기에서 기억해요.</span>
            <button onClick={sample} className="px-4 py-2 rounded-lg text-white font-bold flex items-center gap-1.5" style={{ background: BOARD_PINK }}><Volume2 className="w-4 h-4" /> 들어 보기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- 칩판 자르기 (순수 함수) -----
// ===== 칩판 자르기 (순수 함수 — 화면 없이 테스트 가능) =====
// img: { width, height, data(RGBA) }  →  [{ x, y, w, h }] 잘라낼 그림 영역 (원본 좌표)
const chipLum = (d, i) => (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
// 배경과 구분되는 '잉크' 판정: 어둡거나, 색이 진한 픽셀
const chipInk = (d, i) => {
  const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
  if (a < 40) return false;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return chipLum(d, i) < 225 || (mx - mn) > 40;
};
const chipGroup = (idx, gap) => {
  const out = [];
  for (const v of idx) {
    if (out.length && v - out[out.length - 1][1] <= gap) out[out.length - 1][1] = v;
    else out.push([v, v]);
  }
  return out;
};
// 진한 선(표 선·점선) 찾기
const chipFindLines = (img, x0, y0, x1, y1, horizontal, thr) => {
  const { width: W, height: H, data: d } = img;
  const dk = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? false : chipLum(d, (y * W + x) * 4) < 175;
  const idx = [];
  if (horizontal) {
    const t = Math.max(4, Math.round(H * 0.004)), span = x1 - x0;
    const tol = Math.max(3, Math.round(W * 0.015));
    for (let y = y0; y < y1; y++) {
      let c = 0, run = 0, best = 0, miss = 0;
      for (let x = x0; x < x1; x++) {
        if (dk(x, y) && !dk(x, y - t) && !dk(x, y + t)) { c++; run += 1 + miss; miss = 0; if (run > best) best = run; }
        else if (run > 0 && ++miss > tol) { run = 0; miss = 0; }
      }
      // 길게 이어진 선만 (그림 속 짧은 가로 윤곽선은 제외)
      if (c > span * thr && best > W * 0.15) idx.push(y);
    }
  } else {
    const t = Math.max(4, Math.round(W * 0.004)), span = y1 - y0;
    for (let x = x0; x < x1; x++) {
      let c = 0;
      for (let y = y0; y < y1; y++) if (dk(x, y) && !dk(x - t, y) && !dk(x + t, y)) c++;
      if (c > span * thr) idx.push(x);
    }
  }
  return chipGroup(idx, 3).map(([a, b]) => Math.round((a + b) / 2));
};
// 잉크가 있는 줄/칸의 구간들 (빈 틈으로 나뉨)
const chipBands = (img, x0, y0, x1, y1, horizontal, minGap) => {
  const { width: W, data: d } = img;
  const idx = [];
  if (horizontal) {
    const need = Math.max(1, (x1 - x0) * 0.004);
    for (let y = y0; y < y1; y++) {
      let c = 0;
      for (let x = x0; x < x1; x++) if (chipInk(d, (y * W + x) * 4)) { c++; if (c >= need) break; }
      if (c >= need) idx.push(y);
    }
  } else {
    const need = Math.max(1, (y1 - y0) * 0.004);
    for (let x = x0; x < x1; x++) {
      let c = 0;
      for (let y = y0; y < y1; y++) if (chipInk(d, (y * W + x) * 4)) { c++; if (c >= need) break; }
      if (c >= need) idx.push(x);
    }
  }
  return chipGroup(idx, minGap);
};
const chipMedian = (arr) => { const s = [...arr].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
// 한 칸 안에서 그림 부분만 (아래 글자 띠는 선택적으로 뺌)
const chipTrimCell = (img, cell, stripLabel) => {
  const m = cell.framed === false ? 0 : 0.035;
  const mx = Math.round(cell.w * m), my = Math.round(cell.h * m);
  const x0 = cell.x + mx, y0 = cell.y + my, x1 = cell.x + cell.w - mx, y1 = cell.y + cell.h - my;
  if (x1 - x0 < 8 || y1 - y0 < 8) return null;
  let rows = chipBands(img, x0, y0, x1, y1, true, Math.max(2, Math.round((y1 - y0) * 0.02)));
  if (!rows.length) return null;
  if (stripLabel && rows.length >= 2) {
    const last = rows[rows.length - 1], H = y1 - y0;
    if (last[0] - y0 > H * 0.55 && (last[1] - last[0]) < H * 0.35) rows = rows.slice(0, -1);
  }
  const ty0 = rows[0][0], ty1 = rows[rows.length - 1][1] + 1;
  const cols = chipBands(img, x0, ty0, x1, ty1, false, 2);
  if (!cols.length) return null;
  const tx0 = cols[0][0], tx1 = cols[cols.length - 1][1] + 1;
  if (tx1 - tx0 < 6 || ty1 - ty0 < 6) return null;
  return { x: tx0, y: ty0, w: tx1 - tx0, h: ty1 - ty0, cell };
};
// 칸 가장자리에 테두리(실선·점선)가 있는지
const chipHasFrame = (img, c) => {
  const { width: W, data: d } = img;
  const band = Math.max(2, Math.round(c.h * 0.03));
  let hit = 0;
  for (let x = c.x; x < c.x + c.w; x++) {
    for (let y = c.y; y < c.y + band; y++) if (chipInk(d, (y * W + x) * 4)) { hit++; break; }
  }
  return hit > c.w * 0.3;
};
// 칩판 한 장 → 칩 영역 목록
const splitChipSheet = (img, stripLabel = true) => {
  const W = img.width, H = img.height;
  // 1) 표 선(실선·점선)으로 나누기 — 칸끼리 선을 같이 쓰는 표
  let byLines = [];
  const hl = chipFindLines(img, 0, 0, W, H, true, 0.15);
  if (hl.length >= 2) {
    let cells = [];
    // 줄마다 세로선을 따로 찾음 → 줄마다 칩 위치가 달라도(가운데 정렬 등) 맞게 나눔
    for (let i = 0; i < hl.length - 1; i++) {
      const y0 = hl[i], y1 = hl[i + 1];
      if (y1 - y0 < H * 0.04) continue;
      const bh = y1 - y0, e = Math.max(3, Math.round(bh * 0.03));
      const darkNear = (x, ya, yb) => {
        for (let y = ya; y < yb; y++) for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx; if (xx < 0 || xx >= W) continue;
          if (chipLum(img.data, (y * W + xx) * 4) < 175) return true;
        }
        return false;
      };
      // 칸 테두리는 위아래 끝까지 닿음 — 그림 속 세로 윤곽선은 걸러냄
      const vl = chipFindLines(img, 0, y0, W, y1, false, 0.5)
        .filter(x => darkNear(x, y0 + 1, y0 + e) && darkNear(x, y1 - e, y1 - 1));
      for (let j = 0; j < vl.length - 1; j++) cells.push({ x: vl[j], y: y0, w: vl[j + 1] - vl[j], h: y1 - y0 });
    }
    const mw = chipMedian(cells.map(c => c.w)), mh = chipMedian(cells.map(c => c.h));
    cells = cells.filter(c => c.w > mw * 0.6 && c.h > mh * 0.6 && c.w < mw * 1.6);
    byLines = cells.map(c => chipTrimCell(img, c, stripLabel)).filter(Boolean);
  }
  // 2) 빈 틈으로 나누기 — 칩마다 떨어져 있는 판(점선 상자 등)
  let byGaps = [];
  {
    let cells = [];
    const rb = chipBands(img, 0, 0, W, H, true, Math.max(3, Math.round(H * 0.006)));
    for (const [ry0, ry1] of rb) {
      const cb = chipBands(img, 0, ry0, W, ry1 + 1, false, Math.max(3, Math.round(W * 0.006)));
      for (const [cx0, cx1] of cb) cells.push({ x: cx0, y: ry0, w: cx1 - cx0 + 1, h: ry1 - ry0 + 1 });
    }
    const big = cells.filter(c => c.w > W * 0.05 && c.h > H * 0.05);
    const mw = chipMedian(big.map(c => c.w)), mh = chipMedian(big.map(c => c.h));
    cells = big.filter(c => c.w > mw * 0.5 && c.h > mh * 0.5 && c.w < mw * 1.8 && c.h < mh * 1.8);
    cells = cells.map(c => {
      const framed = chipHasFrame(img, c);
      if (framed) return { ...c, framed: true };
      const x = Math.max(0, c.x - 4), y = Math.max(0, c.y - 4);
      return { x, y, w: Math.min(W - x, c.w + 8), h: Math.min(H - y, c.h + 8), framed: false };
    });
    byGaps = cells.map(c => chipTrimCell(img, c, stripLabel)).filter(Boolean);
  }
  let out = byGaps.length > byLines.length ? byGaps : byLines;
  if (!out.length) {
    const one = chipTrimCell(img, { x: 0, y: 0, w: W, h: H, framed: false }, false);
    out = one ? [one] : [];
  }
  return out;
};

// ----- 파일 → 캔버스 -----
let _pdfjsPromise = null;
const loadPdfJs = () => {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (_pdfjsPromise) return _pdfjsPromise;
  _pdfjsPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload = () => {
      try {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } catch (e) { reject(e); }
    };
    s.onerror = () => { _pdfjsPromise = null; reject(new Error('PDF 도구를 불러오지 못했어요')); };
    document.head.appendChild(s);
  });
  return _pdfjsPromise;
};

const imageFileToCanvas = (file, maxSide = 2400) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const im = new Image();
  im.onload = () => {
    const sc = Math.min(1, maxSide / Math.max(im.naturalWidth, im.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(im.naturalWidth * sc));
    c.height = Math.max(1, Math.round(im.naturalHeight * sc));
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(im, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    resolve(c);
  };
  im.onerror = () => { URL.revokeObjectURL(url); reject(new Error('그림을 열 수 없어요')); };
  im.src = url;
});

// "45-51,53" → [45..51,53]. 비우면 null(전체)
const parsePageRange = (txt, max) => {
  const t = (txt || '').trim();
  if (!t) return null;
  const out = new Set();
  for (const part of t.split(/[,\s]+/)) {
    if (!part) continue;
    const m = part.match(/^(\d+)(?:\s*[-~]\s*(\d+))?$/);
    if (!m) continue;
    let a = parseInt(m[1], 10), b = m[2] ? parseInt(m[2], 10) : a;
    if (a > b) [a, b] = [b, a];
    for (let i = a; i <= b; i++) if (i >= 1 && i <= max) out.add(i);
  }
  return out.size ? [...out].sort((x, y) => x - y) : null;
};

const canvasCropSquare = (src, b, size = 400) => {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, size, size);
  const s = Math.max(b.w, b.h) * 1.08;
  const k = size / s;
  const dw = b.w * k, dh = b.h * k;
  ctx.drawImage(src, b.x, b.y, b.w, b.h, (size - dw) / 2, (size - dh) / 2, dw, dh);
  return c.toDataURL('image/jpeg', 0.9);
};

// '01 자동차 놀이__1_타.png' → 칩 이름 '타', 묶음 이름 '자동차 놀이' (앞 번호는 순서용)
const nameFromFile = (fname) => {
  let s = (fname || '').replace(/\.[^.]+$/, '');
  const k = s.lastIndexOf('__');
  if (k >= 0) s = s.slice(k + 2);
  return s.replace(/^\d+[_\-.\s]*/, '').replace(/_/g, ' ').replace(/？/g, '?').trim();
};
const groupFromFile = (fname) => {
  const s = (fname || '').replace(/\.[^.]+$/, '');
  const k = s.lastIndexOf('__');
  return k > 0 ? s.slice(0, k).replace(/^\d+[_\-.\s]*/, '').replace(/_/g, ' ').trim() : '';
};
const fileNameCompare = (a, b) => (a.name || '').localeCompare(b.name || '', 'ko', { numeric: true });

// 칩판 파일들 → [{ id, image, label, include }]
const cutChipFiles = async (files, { stripLabel, pageText }, onStatus) => {
  const list = Array.from(files || []);
  const images = list.filter(f => /^image\//.test(f.type));
  const pdfs = list.filter(f => f.type === 'application/pdf' || /\.pdf$/i.test(f.name));
  const chips = [];
  const push = (image, label, group) => chips.push({ id: newId(), image, label: label || '', group: group || '', include: true });

  // 그림 여러 장 = 그림 한 장이 칩 하나 (파일 이름을 칩 이름으로)
  if (images.length >= 2 && pdfs.length === 0) {
    images.sort(fileNameCompare);
    for (let i = 0; i < images.length; i++) {
      onStatus(`그림 ${i + 1}/${images.length}장 정리하는 중`);
      try {
        const c = await imageFileToCanvas(images[i], 1200);
        const img = c.getContext('2d').getImageData(0, 0, c.width, c.height);
        const b = chipTrimCell(img, { x: 0, y: 0, w: c.width, h: c.height, framed: false }, stripLabel)
          || { x: 0, y: 0, w: c.width, h: c.height };
        push(canvasCropSquare(c, b), nameFromFile(images[i].name), groupFromFile(images[i].name));
      } catch (e) { devWarn('그림 정리 실패:', e); }
    }
    return chips;
  }

  // 칩판 한 장(그림) 또는 PDF = 칸별로 자르기
  const cutCanvas = (c, texts) => {
    const img = c.getContext('2d').getImageData(0, 0, c.width, c.height);
    const boxes = splitChipSheet(img, stripLabel);
    for (const b of boxes) {
      let label = '';
      if (texts && texts.length && b.cell) {
        const cl = b.cell;
        label = texts
          .filter(t => t.x >= cl.x && t.x <= cl.x + cl.w && t.y >= cl.y && t.y <= cl.y + cl.h)
          .map(t => t.str).join(' ').replace(/\s+/g, ' ').trim();
      }
      push(canvasCropSquare(c, b), label);
    }
  };

  for (const f of images) {
    onStatus('칩판을 자르는 중');
    try { cutCanvas(await imageFileToCanvas(f, 2400), null); } catch (e) { devWarn(e); }
  }
  for (const f of pdfs) {
    onStatus('PDF를 여는 중');
    const pdfjs = await loadPdfJs();
    const buf = await f.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    const pages = parsePageRange(pageText, pdf.numPages) || Array.from({ length: pdf.numPages }, (_, i) => i + 1);
    for (let k = 0; k < pages.length; k++) {
      onStatus(`${k + 1}/${pages.length}쪽 자르는 중`);
      try {
        const page = await pdf.getPage(pages[k]);
        const base = page.getViewport({ scale: 1 });
        const vp = page.getViewport({ scale: Math.min(3, 2000 / base.width) });
        const c = document.createElement('canvas');
        c.width = Math.round(vp.width); c.height = Math.round(vp.height);
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, c.width, c.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        let texts = [];
        try {
          const tc = await page.getTextContent();
          texts = (tc.items || []).filter(it => (it.str || '').trim()).map(it => {
            const [x, y] = vp.convertToViewportPoint(it.transform[4], it.transform[5]);
            return { x, y, str: it.str.trim() };
          });
        } catch (e) { texts = []; }
        cutCanvas(c, texts);
      } catch (e) { devWarn('쪽 자르기 실패:', e); }
    }
  }
  return chips;
};

// ----- 칩판 넣기 창 -----
const ChipImportModal = ({ categories, setCategories, setLibrary, onClose, onSaved }) => {
  const [step, setStep] = useState('pick'); // pick | busy | review | saving
  const [status, setStatus] = useState('');
  const [stripLabel, setStripLabel] = useState(true);
  const [pageText, setPageText] = useState('');
  const [chips, setChips] = useState([]);
  const [catName, setCatName] = useState('');
  const fileRef = useRef(null);

  const onFiles = async (e) => {
    // 목록을 먼저 복사 (value를 비우면 원래 목록도 비워짐)
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    const first = files[0].name || '';
    setStep('busy');
    try {
      const out = await cutChipFiles(files, { stripLabel, pageText }, setStatus);
      if (!out.length) {
        safeAlert('칩을 찾지 못했어요. 칩판을 평평하게 두고 위에서 다시 찍어 보세요.');
        setStep('pick');
        return;
      }
      setChips(out);
      setCatName(files.length > 1 && !/\.pdf$/i.test(first) ? '새 칩 묶음' : nameFromFile(first) || '새 칩 묶음');
      setStep('review');
    } catch (err) {
      safeAlert('자르지 못했어요: ' + (err?.message || '알 수 없는 오류'));
      setStep('pick');
    }
  };

  const picked = chips.filter(c => c.include);
  // 파일 이름에 '놀이 이름__'이 있으면 놀이별로 나눔
  const grouped = chips.some(c => c.group);
  const groupNames = useMemo(() => {
    const out = [];
    chips.forEach(c => { const g = c.group || catName.trim() || '새 칩 묶음'; if (!out.includes(g)) out.push(g); });
    return out;
  }, [chips, catName]);
  const pickedGroups = grouped ? groupNames.filter(g => picked.some(c => (c.group || catName.trim() || '새 칩 묶음') === g)) : [];

  const save = async () => {
    const name = catName.trim();
    if (!grouped && !name) { safeAlert('카테고리 이름을 적어 주세요.'); return; }
    if (!picked.length) { safeAlert('저장할 칩을 하나 이상 남겨 주세요.'); return; }
    setStep('saving');
    const names = grouped ? pickedGroups : [name];
    const newCats = names.map((n, k) => ({
      id: `cat_${Date.now()}_${k}_${Math.random().toString(36).slice(2, 6)}`,
      name: n,
      color: CATEGORY_COLORS[((categories || []).length + k) % CATEGORY_COLORS.length],
    }));
    setCategories(prev => [...(prev || []), ...newCats]);
    const catOf = (c) => newCats[grouped ? names.indexOf(c.group || name || '새 칩 묶음') : 0];
    const savedBy = {};
    let fail = 0, okCount = 0;
    for (let i = 0; i < picked.length; i++) {
      setStatus(`${i + 1}/${picked.length}개 저장하는 중`);
      const cat = catOf(picked[i]);
      const card = { id: newId(), image: picked[i].image, originalImage: null, label: (picked[i].label || '').trim(), categoryId: cat.id };
      const ok = await saveLibraryCard(card).catch(() => false);
      if (ok) { (savedBy[cat.id] = savedBy[cat.id] || []).push(card); okCount++; } else fail++;
    }
    setLibrary(prev => {
      const next = { ...prev };
      Object.entries(savedBy).forEach(([cid, arr]) => { next[cid] = [...(next[cid] || []), ...arr]; });
      return next;
    });
    safeAlert((grouped ? `카테고리 ${newCats.length}개에 ${okCount}개를 저장했어요.` : `'${name}' 카테고리에 ${okCount}개를 저장했어요.`)
      + (fail ? `\n${fail}개는 저장되지 않았어요. 다시 시도해 주세요.` : ''));
    onSaved && onSaved(newCats[0].id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3" onClick={() => step === 'pick' && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <h3 className="font-bold text-stone-900">칩판 넣기</h3>
          {(step === 'pick' || step === 'review') && (
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" aria-label="닫기"><X className="w-5 h-5" /></button>
          )}
        </div>

        {step === 'pick' && (
          <div className="p-5 space-y-4 overflow-auto">
            <div className="text-sm text-stone-600 leading-relaxed space-y-1">
              <p>· <b>칩판 한 장</b>(사진·PDF)을 넣으면 칸마다 잘라 줘요.</p>
              <p>· <b>그림 여러 장</b>을 한꺼번에 고르면 그림 한 장이 칩 하나가 되고, 파일 이름이 칩 이름이 돼요. (예: 044_무릎.png → 무릎)</p>
              <p>· 파일 이름이 '자동차 놀이__1_타.png'처럼 되어 있으면 '자동차 놀이' 카테고리로 나눠 저장해요.</p>
              <p>· 사진을 찍을 때는 칩판을 평평하게 두고 위에서 똑바로 찍어 주세요.</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={stripLabel} onChange={(e) => setStripLabel(e.target.checked)} />
              칩 아래 글자는 빼고 그림만 자르기
            </label>
            <div className="text-sm text-stone-700">
              <p className="mb-1">PDF에서 자를 쪽 <span className="text-stone-400">(비우면 전체)</span></p>
              <input value={pageText} onChange={(e) => setPageText(e.target.value)} placeholder="45-51, 53"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <input ref={fileRef} type="file" accept="image/*,application/pdf,.pdf" multiple className="hidden" onChange={onFiles} />
            <button onClick={() => fileRef.current?.click()}
              className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2" style={{ background: BOARD_PINK }}>
              <Upload className="w-5 h-5" /> 파일 고르기
            </button>
          </div>
        )}

        {(step === 'busy' || step === 'saving') && (
          <div className="p-10 text-center text-stone-600">
            <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin mx-auto mb-3" />
            {status || '잠깐만요…'}
          </div>
        )}

        {step === 'review' && (
          <>
            <div className="px-5 pt-4 space-y-2">
              {grouped ? (
                <p className="text-sm text-stone-700">파일 이름 앞부분대로 <b>카테고리 {pickedGroups.length}개</b>로 나눠 저장해요.</p>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-600 flex-shrink-0">카테고리 이름</span>
                  <input value={catName} onChange={(e) => setCatName(e.target.value)}
                    className="flex-1 border border-stone-300 rounded-lg px-3 py-1.5 text-sm" />
                </div>
              )}
              <p className="text-xs text-stone-500">그림을 누르면 빼거나 다시 넣어요. 이름은 판에서 소리로 읽는 말이 돼요.</p>
            </div>
            <div className="p-5 overflow-auto grid grid-cols-3 sm:grid-cols-5 gap-3">
              {chips.map((c, i) => (<React.Fragment key={c.id}>
                {grouped && (i === 0 || chips[i - 1].group !== c.group) && (
                  <p className="col-span-full text-sm font-bold text-stone-800 pt-2 border-t border-stone-100 first:border-0 first:pt-0">{c.group || '묶음 없음'}</p>
                )}
                <div className={`rounded-xl border p-1.5 ${c.include ? 'border-stone-300' : 'border-dashed border-stone-300 opacity-40'}`}>
                  <button className="w-full aspect-square bg-white rounded-lg overflow-hidden relative"
                    onClick={() => setChips(prev => prev.map((x, j) => j === i ? { ...x, include: !x.include } : x))}>
                    <img src={c.image} alt="" className="w-full h-full object-contain" />
                    {!c.include && <span className="absolute inset-0 flex items-center justify-center"><X className="w-8 h-8 text-stone-500" /></span>}
                  </button>
                  <input value={c.label} placeholder="이름"
                    onChange={(e) => setChips(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                    className="mt-1 w-full border border-stone-200 rounded-md px-2 py-1 text-xs text-center" />
                </div>
              </React.Fragment>))}
            </div>
            <div className="px-5 py-3 border-t border-stone-200 flex items-center justify-between gap-2">
              <button onClick={() => { setChips([]); setStep('pick'); }} className="px-3 py-2 rounded-lg border border-stone-300 text-sm">다시 고르기</button>
              <button onClick={save} className="px-4 py-2 rounded-lg text-white text-sm font-bold" style={{ background: BOARD_PINK }}>
                {grouped ? `카테고리 ${pickedGroups.length}개에 저장 (${picked.length}개)` : `카테고리에 저장 (${picked.length}개)`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ----- 칸에 넣을 그림 고르기 창 -----
const BoardCardPicker = ({ library, categories, cell, onPick, onClear, onLabel, onClose }) => {
  const [catId, setCatId] = useState('__all__');
  const [q, setQ] = useState('');
  const [label, setLabel] = useState(cell?.label || '');
  const [touched, setTouched] = useState(false);
  const all = useMemo(() => {
    const out = [];
    Object.entries(library || {}).forEach(([k, arr]) => (arr || []).forEach(c => { if (c && c.image) out.push({ ...c, _cat: k }); }));
    return out;
  }, [library]);
  const shown = all.filter(c =>
    (catId === '__all__' || c._cat === catId) &&
    (!q.trim() || (c.label || '').includes(q.trim())));
  const hasNone = all.some(c => c._cat === '__none__');
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <h3 className="font-bold text-stone-900">칸 고치기</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" aria-label="닫기"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 pt-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-600 flex-shrink-0">읽어 줄 말</span>
            <input value={label} onChange={(e) => { setLabel(e.target.value); setTouched(true); }} placeholder="예: 밴드 붙여 주세요"
              className="flex-1 border border-stone-300 rounded-lg px-3 py-1.5 text-sm" />
            <button onClick={() => { onLabel(label.trim()); onClose(); }} className="px-3 py-1.5 rounded-lg border border-stone-300 text-sm">말만 바꾸기</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setCatId('__all__')}
              className={`px-2.5 py-1 rounded-full text-xs border ${catId === '__all__' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 text-stone-600'}`}>전체</button>
            {(categories || []).map(c => (
              <button key={c.id} onClick={() => setCatId(c.id)}
                className={`px-2.5 py-1 rounded-full text-xs border ${catId === c.id ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 text-stone-600'}`}>{c.name}</button>
            ))}
            {hasNone && (
              <button onClick={() => setCatId('__none__')}
                className={`px-2.5 py-1 rounded-full text-xs border ${catId === '__none__' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 text-stone-600'}`}>미분류</button>
            )}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="그림 이름으로 찾기"
              className="w-full border border-stone-300 rounded-lg pl-9 pr-3 py-1.5 text-sm" />
          </div>
        </div>
        <div className="p-5 overflow-auto grid grid-cols-4 sm:grid-cols-6 gap-2">
          {shown.length === 0 && <p className="col-span-full text-center text-sm text-stone-400 py-8">그림이 없어요. 카테고리에 그림을 넣거나 '칩판 넣기'를 써 보세요.</p>}
          {shown.map(c => (
            <button key={c.id} onClick={() => { onPick(c, touched ? label.trim() : null); onClose(); }}
              className="rounded-lg border border-stone-200 hover:border-stone-500 p-1 bg-white">
              <img src={c.image} alt="" loading="lazy" className="w-full aspect-square object-contain" />
              <p className="text-[11px] text-stone-700 truncate">{c.label || '이름 없음'}</p>
            </button>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-stone-200 flex justify-between">
          <button onClick={() => { onClear(); onClose(); }} className="px-3 py-2 rounded-lg border border-stone-300 text-sm text-red-600">칸 비우기</button>
          <button onClick={onClose} className="px-3 py-2 rounded-lg border border-stone-300 text-sm">닫기</button>
        </div>
      </div>
    </div>
  );
};

const escHtml = (s) => String(s || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// ----- 인쇄 (새 창에서) -----
const printBoardWindow = (board, cellsInfo, withChips, pagesInfo) => {
  const w = window.open('', '_blank');
  if (!w) { safeAlert('인쇄 창을 열 수 없어요. 브라우저의 팝업 차단을 풀어 주세요.'); return; }
  const cols = board.cols || 4;
  const rows = Math.ceil(cellsInfo.length / cols) || 1;
  const cellH = Math.min(170 / rows, 260 / cols);
  const boardCells = cellsInfo.map(c => c.hidden || !c.image && !c.label
    ? '<div class="cell empty"></div>'
    : `<div class="cell">${c.image ? `<img src="${escHtml(c.image)}">` : ''}${board.showLabel !== false && c.label ? `<div class="lb">${escHtml(c.label)}</div>` : ''}</div>`
  ).join('');
  const chipList = cellsInfo.filter(c => !c.hidden && (c.image || c.label));
  const chipCells = chipList.map(c =>
    `<div class="chip">${c.image ? `<img src="${escHtml(c.image)}">` : ''}${c.label ? `<div class="lb">${escHtml(c.label)}</div>` : ''}</div>`).join('');
  const storyHtml = (pagesInfo || []).map((pg, i) => `<div class="story">
${pg.image ? `<img src="${escHtml(pg.image)}">` : '<div class="noimg"></div>'}
${pg.text ? `<div class="st">${escHtml(pg.text)}</div>` : ''}
${(pg.questions || []).length ? `<div class="sq">${pg.questions.map(q => `<span>${escHtml(q)}</span>`).join('')}</div>` : ''}
<div class="pn">${i + 1} / ${pagesInfo.length}</div></div>`).join('');
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escHtml(board.name)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
@page { size: A4 landscape; margin: 10mm; }
body { margin: 0; font-family: 'Jua', system-ui, sans-serif; color: #1c1917; }
h1 { font-size: 20pt; text-align: center; margin: 0 0 4mm; }
.grid { display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 3mm; }
.cell { height: ${cellH}mm; border: 0.4mm solid #a8a29e; border-radius: 3mm; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
.cell.empty { border-style: dashed; border-color: #e7e5e4; }
.cell img { max-width: 85%; max-height: 72%; object-fit: contain; }
.lb { font-size: 16pt; margin-top: 1mm; text-align: center; }
.page2 { page-break-before: always; }
.chips { display: flex; flex-wrap: wrap; gap: 0; }
.chip { width: 50mm; height: 50mm; box-sizing: border-box; border: 0.3mm dashed #57534e; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
.chip img { max-width: 80%; max-height: 70%; object-fit: contain; }
.chip .lb { font-size: 13pt; }
.story { height: 186mm; display: flex; flex-direction: column; align-items: center; justify-content: center; page-break-after: always; }
.story img { max-width: 100%; max-height: 135mm; object-fit: contain; border-radius: 3mm; }
.story .noimg { width: 180mm; height: 120mm; border: 0.4mm dashed #d6d3d1; border-radius: 3mm; }
.st { font-size: 24pt; margin-top: 5mm; text-align: center; }
.sq { margin-top: 4mm; display: flex; gap: 4mm; }
.sq span { font-size: 15pt; border: 0.4mm solid #D4728A; color: #993556; border-radius: 20mm; padding: 1.5mm 6mm; }
.pn { font-size: 10pt; color: #a8a29e; margin-top: 3mm; }
</style></head><body>
${storyHtml}
<h1>${escHtml(board.name)}</h1>
<div class="grid">${boardCells}</div>
${withChips && chipList.length ? `<div class="page2"><div class="chips">${chipCells}</div></div>` : ''}
<script>
var imgs = Array.prototype.slice.call(document.images);
Promise.all(imgs.map(function(i){ return i.complete ? 0 : new Promise(function(r){ i.onload = i.onerror = r; }); }))
  .then(function(){ return document.fonts ? document.fonts.ready : 0; })
  .then(function(){ setTimeout(function(){ window.print(); }, 300); });
<\/script></body></html>`);
  w.document.close();
};

// ----- 새 판 만들기 창 (빈 판 / 카테고리로 만들기) -----
const libCardOrder = (a, b) => String(a.id || '').localeCompare(String(b.id || ''), 'en', { numeric: true });
const STORY_DEFAULT_QUESTIONS = ['뭐 하고 있어?', '기분이 어때?'];
const isVideoFile = (f) => /^video\//.test(f?.type || '') || /\.(mp4|mov|m4v|webm)$/i.test(f?.name || '');
const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result);
  fr.onerror = () => reject(new Error('파일을 읽을 수 없어요'));
  fr.readAsDataURL(file);
});
// 이야기 영상 1개를 잠긴 저장 공간(aac-cards)에 올림 → 경로. 실패하면 null
async function uploadStoryVideo(file) {
  try {
    if (file.size > 40 * 1024 * 1024) return null;
    const dataUrl = await fileToDataUrl(file);
    const headers = await authHeaders();
    const r = await fetch(AAC_STORAGE_FN(), {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'upload', cardId: `vid_${newId()}`, kind: '', contentType: file.type || 'video/mp4', base64: dataUrl }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.path || null;
  } catch (e) { devWarn('영상 올리기 실패:', e); return null; }
}
const NewBoardModal = ({ library, categories, setCategories, setLibrary, onCreate, onClose, groupNames = [] }) => {
  const [tab, setTab] = useState('cat');
  const [storyFiles, setStoryFiles] = useState([]);
  const [storyQ, setStoryQ] = useState(STORY_DEFAULT_QUESTIONS.join(', '));
  const [storyGroup, setStoryGroup] = useState('이야기책');
  const [busy, setBusy] = useState('');
  const storyRef = useRef(null);
  const [name, setName] = useState('');
  const [cols, setCols] = useState(4);
  const cats = useMemo(() => {
    const list = (categories || []).map(c => ({ id: c.id, name: c.name, count: (library?.[c.id] || []).filter(x => x && x.image).length }));
    const none = (library?.['__none__'] || []).filter(x => x && x.image).length;
    if (none) list.push({ id: '__none__', name: '미분류', count: none });
    return list.filter(c => c.count > 0);
  }, [library, categories]);
  const [checked, setChecked] = useState(() => new Set());
  const toggle = (id) => setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOn = cats.length > 0 && cats.every(c => checked.has(c.id));

  const makeStory = async () => {
    const title = name.trim();
    if (!title) { safeAlert('이야기 판 이름을 적어 주세요.'); return; }
    if (!storyFiles.length) { safeAlert('이야기 그림이나 영상을 골라 주세요.'); return; }
    const files = [...storyFiles].sort(fileNameCompare);
    const qs = storyQ.split(/[,，]/).map(x => x.trim()).filter(Boolean);
    const hasImage = files.some(f => !isVideoFile(f));
    let cat = null;
    if (hasImage) {
      cat = { id: `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name: `이야기 · ${title}`, color: CATEGORY_COLORS[(categories || []).length % CATEGORY_COLORS.length] };
      setCategories(prev => [...(prev || []), cat]);
    }
    const pages = [], saved = [];
    let videoFail = 0;
    for (let i = 0; i < files.length; i++) {
      setBusy(`${i + 1}/${files.length}개 올리는 중`);
      const text = nameFromFile(files[i].name);
      try {
        if (isVideoFile(files[i])) {
          const path = await uploadStoryVideo(files[i]);
          if (path) pages.push({ cardId: null, videoPath: path, text, questions: [...qs] });
          else videoFail++;
        } else {
          const c = await imageFileToCanvas(files[i], 1000);
          const card = { id: newId(), image: c.toDataURL('image/jpeg', 0.85), originalImage: null, label: text, categoryId: cat.id };
          if (await saveLibraryCard(card).catch(() => false)) { saved.push(card); pages.push({ cardId: card.id, text, questions: [...qs] }); }
        }
      } catch (e) { devWarn('이야기 파일 실패:', e); }
    }
    setBusy('');
    if (saved.length) setLibrary(prev => ({ ...prev, [cat.id]: [...(prev[cat.id] || []), ...saved] }));
    if (!pages.length) {
      safeAlert(videoFail ? '영상을 올리지 못했어요.\n저장 공간이 영상을 받지 않도록 설정되어 있을 수 있어요. 이 화면을 캡처해서 Claude에게 보여 주세요.' : '올리지 못했어요. 다시 시도해 주세요.');
      return;
    }
    if (pages.length < files.length) safeAlert(`${files.length - pages.length}개는 올라가지 않았어요.` + (videoFail ? ' (영상)' : ''));
    onCreate([{ name: title, cols: 4, cells: null, kind: 'story', pages, group: storyGroup.trim() }]);
  };

  const make = () => {
    if (tab === 'story') { makeStory(); return; }
    if (tab === 'blank') {
      onCreate([{ name: name.trim() || '새 판', cols: 4, cells: null }]);
      return;
    }
    const pick = cats.filter(c => checked.has(c.id));
    if (!pick.length) { safeAlert('판으로 만들 카테고리를 하나 이상 골라 주세요.'); return; }
    onCreate(pick.map(c => {
      const cards = [...(library?.[c.id] || [])].filter(x => x && x.image).sort(libCardOrder);
      return { name: c.name, cols, cells: cards.map(x => ({ cardId: x.id, label: '' })) };
    }));
  };

  const tabBtn = (t, label) => (
    <button onClick={() => setTab(t)}
      className={`px-3 py-1.5 rounded-lg text-sm border ${tab === t ? 'font-bold' : 'border-stone-300 text-stone-600'}`}
      style={tab === t ? { borderColor: BOARD_PINK, color: '#993556', borderWidth: 1.5 } : undefined}>{label}</button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <h3 className="font-bold text-stone-900">새 판</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" aria-label="닫기"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 pt-4 flex gap-2 flex-wrap">{tabBtn('blank', '빈 판')}{tabBtn('cat', '카테고리로 만들기')}{tabBtn('story', '이야기 판')}</div>
        {busy ? (
          <div className="p-10 text-center text-stone-600">
            <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin mx-auto mb-3" />{busy}
          </div>
        ) : tab === 'story' ? (
          <div className="p-5 space-y-3">
            <p className="text-sm text-stone-600 leading-relaxed">그림이나 영상을 한꺼번에 고르면 하나가 한 쪽이 돼요. 파일 이름 순서대로 쪽이 놓이고, 파일 이름이 그 쪽의 문장이 돼요. (예: 1_민수가 그네를 타요.png) 영상은 쪽을 열면 바로 재생돼요.</p>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이야기 판 이름 (예: 놀이터에 갔어요)"
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
            <input ref={storyRef} type="file" accept="image/*,video/*" multiple className="hidden"
              onChange={(e) => { setStoryFiles(Array.from(e.target.files || [])); e.target.value = ''; }} />
            <button onClick={() => storyRef.current?.click()} className="w-full py-2.5 rounded-lg border border-stone-300 text-sm flex items-center justify-center gap-1.5">
              <ImageIcon className="w-4 h-4" /> {storyFiles.length ? `${storyFiles.length}개 골랐어요 (다시 고르기)` : '이야기 그림·영상 고르기'}
            </button>
            <label className="block text-sm text-stone-700">쪽마다 넣을 질문 <span className="text-stone-400">(쉼표로 나눠 적기)</span>
              <input value={storyQ} onChange={(e) => setStoryQ(e.target.value)} placeholder="기분이 어떨 것 같아?"
                className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm text-stone-700">묶음
              <input value={storyGroup} onChange={(e) => setStoryGroup(e.target.value)} list="aac-board-groups" placeholder="예: 이야기책"
                className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
              <datalist id="aac-board-groups">{groupNames.map(g => <option key={g} value={g} />)}</datalist>
            </label>
            <p className="text-xs text-stone-500">질문과 묶음은 '판 고치기'에서 바꿀 수 있어요. 답 칸은 빈 칸 8개로 시작해요.</p>
          </div>
        ) : tab === 'blank' ? (
          <div className="p-5 space-y-2">
            <p className="text-sm text-stone-600">빈 칸 8개짜리 판이 생겨요. '판 고치기'에서 칸마다 그림을 넣으면 돼요.</p>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="판 이름 (예: 다쳤어요 판)" autoFocus
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
          </div>
        ) : (
          <>
            <div className="px-5 pt-3 space-y-2">
              <p className="text-sm text-stone-600">고른 카테고리마다 판이 하나씩 생겨요. 판 이름은 카테고리 이름, 칸은 카테고리 안 그림 순서대로 들어가요.</p>
              {cats.length > 0 && (
                <label className="flex items-center gap-2 text-sm text-stone-700">
                  <input type="checkbox" checked={allOn} onChange={() => setChecked(allOn ? new Set() : new Set(cats.map(c => c.id)))} /> 모두 고르기
                </label>
              )}
            </div>
            <div className="px-5 py-2 overflow-auto flex-1">
              {cats.length === 0 && <p className="text-sm text-stone-400 py-6 text-center">그림이 들어 있는 카테고리가 없어요. 먼저 '칩판 넣기'로 그림을 넣어 주세요.</p>}
              {cats.map(c => (
                <label key={c.id} className="flex items-center gap-2 py-2 border-b border-stone-100 text-sm">
                  <input type="checkbox" checked={checked.has(c.id)} onChange={() => toggle(c.id)} />
                  <span className="flex-1">{c.name}</span>
                  <span className="text-xs text-stone-500">{c.count}개</span>
                </label>
              ))}
            </div>
          </>
        )}
        <div className="px-5 py-3 border-t border-stone-200 flex items-center justify-between gap-2">
          {tab === 'cat' ? (
            <label className="text-sm text-stone-600 flex items-center gap-1.5">한 줄에
              <select value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10))} className="border border-stone-300 rounded-md px-1.5 py-1 bg-white">
                {[2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}칸</option>)}
              </select>
            </label>
          ) : <span />}
          <button onClick={make} disabled={!!busy} className="px-4 py-2 rounded-lg text-white text-sm font-bold disabled:opacity-50" style={{ background: BOARD_PINK }}>
            {tab === 'cat' ? `판 만들기${checked.size ? ` (${cats.filter(c => checked.has(c.id)).length}개)` : ''}` : '판 만들기'}
          </button>
        </div>
      </div>
    </div>
  );
};

const newBoard = (name) => ({
  id: `board_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
  name: name || '새 판',
  cols: 4,
  showLabel: true,
  cells: Array.from({ length: 8 }, () => ({ cardId: null, label: '' })),
  hidden: {},
  updatedAt: Date.now(),
});

// ----- 말하는 판 화면 -----
const SpeakingBoardView = ({ currentUser, library, setLibrary, categories, setCategories }) => {
  const [boards, setBoards] = useState([]);
  const [builtins, setBuiltins] = useState([]); // 기본 판 (읽기 전용, hidden만 계정별). cells는 처음엔 null
  const [showBuiltinUpload, setShowBuiltinUpload] = useState(false);
  const builtinLoading = useRef({});
  const isAdmin = currentUser?.role === 'admin';
  const loadBuiltinIndex = async () => {
    try {
      const idx = await sharedGet(SHARED_INDEX_KEY);
      if (idx.error || !idx.value) return [];
      const list = JSON.parse(idx.value) || [];
      const hres = await dataList(BUILTIN_HIDDEN_PREFIX);
      const hmap = {};
      for (const row of (hres.rows || [])) { try { hmap[row.key.slice(BUILTIN_HIDDEN_PREFIX.length)] = JSON.parse(row.value) || {}; } catch {} }
      return list.filter(b => b && b.id).map(b => ({ ...b, builtin: true, cells: null, hidden: hmap[b.id] || {} }));
    } catch (e) { devWarn('기본 판 목록 불러오기 실패:', e); return []; }
  };
  const ensureBuiltin = async (id) => {
    if (!id || builtinLoading.current[id]) return;
    builtinLoading.current[id] = true;
    const r = await sharedGet(SHARED_BOARD_KEY(id));
    let cells = null, extra = {};
    try {
      const o = r.value ? JSON.parse(r.value) : null;
      cells = o ? (o.cells || []) : null;
      if (o && o.kind === 'story') extra = { kind: 'story', pages: o.pages || [], sentence: o.sentence !== false };
      else if (o && typeof o.sentence === 'boolean') extra = { sentence: o.sentence };
      if (o && Array.isArray(o.cellSets) && o.cellSets.length) extra = { ...extra, cellSets: o.cellSets, cellSetDefault: o.cellSetDefault || 0 };
      if (o && o.sort) extra = { ...extra, sort: true, ...(Array.isArray(o.sortDefault) ? { sortDefault: o.sortDefault } : {}) };
      if (o && o.kinds) extra = { ...extra, kinds: o.kinds };
      if (o && o.frame) extra = { ...extra, frame: o.frame, frameFixed: o.frameFixed || {}, frameWho: o.frameWho || [] };
    } catch { cells = null; }
    if (!cells) { builtinLoading.current[id] = false; if (r.error) safeAlert('기본 판을 불러오지 못했어요. 잠시 뒤 다시 골라 주세요.'); return; }
    setBuiltins(prev => prev.map(b => b.id === id ? { ...b, cells, ...extra } : b));
  };
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [kids, setKids] = useState([]);
  const [kidId, setKidId] = useState('all');
  const [mode, setMode] = useState('use'); // use | edit | hide
  const [big, setBig] = useState(false);
  const [pickIndex, setPickIndex] = useState(null);
  const [storyPage, setStoryPage] = useState(0);
  const [pickPage, setPickPage] = useState(false);
  const [sentence, setSentence] = useState([]); // 문장 줄에 쌓인 낱말 [{ label, image }]
  const [videoUrls, setVideoUrls] = useState({}); // 영상 경로 → 서명 주소
  const videoRef = useRef(null);
  const pageVideoInput = useRef(null);
  const [videoBusy, setVideoBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ☰ 메뉴
  const [showPicker, setShowPicker] = useState(false); // 판 고르기 창
  const [pickQ, setPickQ] = useState('');
  const [pickArea, setPickArea] = useState(null);
  const [showPracSet, setShowPracSet] = useState(false); // 정답 연습 설정 창
  const [narrow, setNarrow] = useState(() => { try { return window.matchMedia('(max-width: 640px)').matches; } catch { return false; } });
  useEffect(() => {
    let mq; try { mq = window.matchMedia('(max-width: 640px)'); } catch { return undefined; }
    const on = () => setNarrow(mq.matches);
    try { mq.addEventListener('change', on); } catch { try { mq.addListener(on); } catch {} }
    return () => { try { mq.removeEventListener('change', on); } catch { try { mq.removeListener(on); } catch {} } };
  }, []);
  const [showVoice, setShowVoice] = useState(false); // 목소리 고르기 창
  const [showLibrary, setShowLibrary] = useState(false); // 자료실
  // 영상 소리 끄기 (이 기기에서 기억)
  const [videoMuted, setVideoMuted] = useState(() => { try { return localStorage.getItem('aac_video_muted') === '1'; } catch { return false; } });
  const toggleVideoMuted = () => setVideoMuted(m => {
    const n = !m;
    try { localStorage.setItem('aac_video_muted', n ? '1' : '0'); } catch {}
    try { if (videoRef.current) videoRef.current.muted = n; } catch {}
    return n;
  });
  const [qOn, setQOn] = useState([]); // 누른 질문 번호들 → 그 질문의 답 칸만 보임
  // 정답 연습: 쪽마다 정답(page.answer = 낱말 목록)이 있는 이야기 판에서 맞았는지 알려 줌
  const [practice, setPractice] = useState(() => { try { return localStorage.getItem('aac_practice') === '1'; } catch { return false; } });
  const [choiceN, setChoiceN] = useState(() => { try { return parseInt(localStorage.getItem('aac_choice_n') || '0', 10) || 0; } catch { return 0; } });
  const [tries, setTries] = useState({ wrong: [], solved: false });
  const [score, setScore] = useState({});
  const [frameBy, setFrameBy] = useState({}); // 답하는 방법(낱말 0 / 문장 2칸 / 3칸), 판마다
  const [frameFill, setFrameFill] = useState([]); // 문장 틀에 채운 칸
  const [frameMsg, setFrameMsg] = useState('');
  const [missCount, setMissCount] = useState({}); // 쪽마다 틀린 횟수
  const [showResult, setShowResult] = useState(false);
  const [sortCellsBy, setSortCellsBy] = useState({}); // 분류 판: 오늘 할 칸 (판마다)
  const [sortMany, setSortMany] = useState(() => { try { return localStorage.getItem('aac_sort_many') === '1'; } catch { return false; } });
  const [picked, setPicked] = useState(false); // 여러 장 함께: 그림을 골랐는지
  const advanceTimer = useRef(null);
  useEffect(() => { try { localStorage.setItem('aac_sort_many', sortMany ? '1' : '0'); } catch {} }, [sortMany]);
  useEffect(() => { try { localStorage.setItem('aac_practice', practice ? '1' : '0'); } catch {} }, [practice]);
  useEffect(() => { try { localStorage.setItem('aac_choice_n', String(choiceN)); } catch {} }, [choiceN]);
  useEffect(() => { setStoryPage(0); setSentence([]); setQOn([]); setTries({ wrong: [], solved: false }); setScore({}); setMissCount({}); setShowResult(false); setPicked(false); }, [activeId]);
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);
  useEffect(() => { setSentence([]); setQOn([]); setTries({ wrong: [], solved: false }); setFrameFill([]); setFrameMsg(''); }, [storyPage]);
  const [showImport, setShowImport] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saying, setSaying] = useState(null);
  const [withChips, setWithChips] = useState(true);
  const [rate, setRate] = useState(() => {
    try { const v = parseFloat(localStorage.getItem('aac_board_rate')); return v >= 0.5 && v <= 1.5 ? v : 0.9; } catch { return 0.9; }
  });
  const saveTimers = useRef({});
  const sayTimer = useRef(null);
  const speechWarned = useRef(false);

  useEffect(() => { try { localStorage.setItem('aac_board_rate', String(rate)); } catch {} }, [rate]);

  // 불러오기
  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    setLoaded(false);
    (async () => {
      const res = await dataList(BOARD_PREFIX);
      const list = [];
      for (const r of (res.rows || [])) {
        try { const b = JSON.parse(r.value); if (b && b.id && Array.isArray(b.cells)) list.push(b); } catch {}
      }
      list.sort((a, b) => (a.createdAt || a.updatedAt || 0) - (b.createdAt || b.updatedAt || 0));
      let kidList = [];
      try { const k = await dataGet(BOARD_KIDS_KEY); if (k?.value) kidList = JSON.parse(k.value) || []; } catch {}
      // 기본 판 목록(그림은 판을 고를 때 불러옴) + 이 계정의 칸 숨기기 기록
      const bi = await loadBuiltinIndex();
      if (cancelled) return;
      setBoards(list);
      setBuiltins(bi);
      setKids(Array.isArray(kidList) ? kidList : []);
      setActiveId(prev => (prev && (list.some(b => b.id === prev) || bi.some(b => b.id === prev && !b.unlisted))) ? prev : (list[0]?.id || bi.find(b => !b.unlisted)?.id || null));
      if (res._error) safeAlert('판을 불러오지 못했어요. 잠시 뒤 새로고침해 주세요.');
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [currentUser]);

  // 화면을 떠날 때 저장 대기 중인 판을 바로 저장
  useEffect(() => () => {
    Object.values(saveTimers.current).forEach(t => { if (t && t.fn) { clearTimeout(t.id); t.fn(); } });
  }, []);

  const scheduleSave = (b) => {
    const prev = saveTimers.current[b.id];
    if (prev) clearTimeout(prev.id);
    const fn = () => {
      delete saveTimers.current[b.id];
      const key = b.builtin ? BUILTIN_HIDDEN_PREFIX + b.id : BOARD_PREFIX + b.id;
      const val = b.builtin ? JSON.stringify(b.hidden || {}) : JSON.stringify(b);
      dataSet(key, val).then(r => { if (!r) safeAlert(`'${b.name}' 판을 저장하지 못했어요. 인터넷 연결을 확인해 주세요.`); });
    };
    saveTimers.current[b.id] = { id: setTimeout(fn, 700), fn };
  };

  const board = boards.find(b => b.id === activeId) || builtins.find(b => b.id === activeId) || null;
  useEffect(() => {
    if (!board) return;
    const need = new Set();
    if (board.builtin && !board.cells) need.add(board.id);
    if (!board.builtin) (board.cells || []).forEach(c => { if (c.ref && !c.cardId) need.add(String(c.ref).split('#')[0]); });
    if (!board.builtin) (board.pages || []).forEach(pg => { if (pg.pageRef && !pg.cardId) need.add(String(pg.pageRef).split('#')[0]); });
    (board.cellSets || []).forEach(s => { if (s && s.ref) need.add(s.ref); });
    need.forEach(id => { const b = builtins.find(x => x.id === id); if (b && !b.cells) ensureBuiltin(id); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, board?.cells, builtins.length]);
  const reloadBuiltins = async () => {
    builtinLoading.current = {};
    const bi = await loadBuiltinIndex();
    setBuiltins(bi);
    setActiveId(prev => (prev && (boards.some(b => b.id === prev) || bi.some(b => b.id === prev && !b.unlisted))) ? prev : (boards[0]?.id || bi.find(b => !b.unlisted)?.id || null));
  };
  const builtinMap = useMemo(() => { const m = {}; builtins.forEach(b => { m[b.id] = b; }); return m; }, [builtins]);
  const updateBoard = (fn) => {
    if (!board) return;
    if (board.builtin) {
      // 기본 판은 칸 숨기기만 바뀜 (그림·말·칸 수는 그대로)
      const nb = { ...board, hidden: fn(board).hidden || {} };
      setBuiltins(prev => prev.map(x => x.id === nb.id ? nb : x));
      scheduleSave(nb);
      return;
    }
    const nb = { ...fn(board), updatedAt: Date.now() };
    setBoards(prev => prev.map(x => x.id === nb.id ? nb : x));
    scheduleSave(nb);
  };
  // 기본 판 → 내 판으로 복사 (그림은 기본 판을 가리키기만 해서 저장 용량이 작음)
  const copyBuiltin = () => {
    if (!board || !board.builtin) return;
    if (!board.cells) { safeAlert('판을 불러오는 중이에요. 잠시 뒤 다시 눌러 주세요.'); return; }
    const b = { ...newBoard(board.name), createdAt: Date.now(), cols: board.cols || 4 };
    b.cells = board.cells.map((c, i) => ({ cardId: null, label: c.label || '', ref: `${board.id}#${i}`, ...(c.q !== undefined ? { q: c.q } : {}) }));
    if (board.kind === 'story') {
      b.kind = 'story';
      b.sentence = board.sentence !== false;
      b.pages = (board.pages || []).map((pg, i) => ({ cardId: null, text: pg.text || '', questions: [...(pg.questions || [])], pageRef: `${board.id}#${i}`, ...(pg.sharedVideo ? { sharedVideo: pg.sharedVideo } : {}) }));
    }
    else if (typeof board.sentence === 'boolean') b.sentence = board.sentence;
    if (Array.isArray(board.cellSets) && board.cellSets.length) { b.cellSets = JSON.parse(JSON.stringify(board.cellSets)); b.cellSetDefault = board.cellSetDefault || 0; }
    b.hidden = JSON.parse(JSON.stringify(board.hidden || {}));
    setBoards(prev => [...prev, b]);
    setActiveId(b.id);
    setMode('edit');
    scheduleSave(b);
  };

  const cardMap = useMemo(() => {
    const m = {};
    Object.values(library || {}).forEach(arr => (arr || []).forEach(c => { if (c && c.id) m[c.id] = c; }));
    return m;
  }, [library]);

  const hiddenList = board ? (board.hidden?.[kidId] ?? board.hidden?.all ?? []) : [];
  const cellView = (cell, i) => {
    const card = cell.cardId ? cardMap[cell.cardId] : null;
    let refImg = '';
    if (!card && cell.ref) {
      const [bid, idx] = String(cell.ref).split('#');
      refImg = builtinMap[bid]?.cells?.[parseInt(idx, 10)]?.image || '';
    }
    return { image: card?.image || cell.image || refImg || '', label: cell.label || card?.label || '', hidden: hiddenList.includes(i), missing: !!cell.cardId && !card };
  };

  const addBoard = () => setShowNew(true);
  // specs: [{ name, cols, cells(null이면 빈 칸 8개) }]
  const createBoards = (specs) => {
    const now = Date.now();
    const made = specs.map((sp, k) => {
      const b = { ...newBoard(sp.name), createdAt: now + k };
      b.id = `${b.id}_${k}`;
      b.cols = sp.cols || 4;
      if (sp.cells && sp.cells.length) b.cells = sp.cells;
      if (sp.kind === 'story') { b.kind = 'story'; b.pages = sp.pages || []; b.sentence = true; }
      if (sp.group) b.group = sp.group;
      return b;
    });
    setBoards(prev => [...prev, ...made]);
    setActiveId(made[0].id);
    setMode(made.length === 1 && !specs[0].cells ? 'edit' : 'use');
    made.forEach(scheduleSave);
    setShowNew(false);
    if (made.length > 1) safeAlert(`판 ${made.length}개를 만들었어요. 위의 판 목록에서 골라 쓰면 돼요.`);
  };
  const deleteBoard = async () => {
    if (!board) return;
    if (!safeConfirm(`'${board.name}' 판을 지울까요?\n지운 판은 되살릴 수 없어요. (카테고리의 그림은 그대로 남아요)`)) return;
    const t = saveTimers.current[board.id];
    if (t) { clearTimeout(t.id); delete saveTimers.current[board.id]; }
    const r = await dataDelete(BOARD_PREFIX + board.id);
    if (!r) { safeAlert('판을 지우지 못했어요. 다시 시도해 주세요.'); return; }
    const vids = (board.pages || []).map(pg => pg.videoPath).filter(Boolean);
    if (vids.length) storageRemove(vids).catch(() => {});
    const rest = boards.filter(b => b.id !== board.id);
    setBoards(rest);
    setActiveId(rest[0]?.id || builtins.find(b => !b.unlisted)?.id || null);
    setMode('use');
  };

  const saveKids = (list) => {
    setKids(list);
    dataSet(BOARD_KIDS_KEY, JSON.stringify(list)).then(r => { if (!r) safeAlert('아이 목록을 저장하지 못했어요.'); });
  };
  const onKidChange = (v) => {
    if (v === '__add__') {
      const name = safePrompt('아이 이름(또는 별칭)을 적어 주세요', '');
      if (!name || !name.trim()) return;
      const k = { id: `kid_${Date.now()}`, name: name.trim() };
      saveKids([...kids, k]);
      setKidId(k.id);
      return;
    }
    setKidId(v);
  };
  const removeKid = () => {
    const k = kids.find(x => x.id === kidId);
    if (!k) return;
    if (!safeConfirm(`'${k.name}'을(를) 아이 목록에서 뺄까요?\n판은 그대로 남아요.`)) return;
    saveKids(kids.filter(x => x.id !== kidId));
    setKidId('all');
  };

  // 문장 틀에 칸 넣기 (맞는 색 → 맞는 낱말 → 다 채우면 문장을 읽고 다음 그림으로)
  const frameTap = (label, image, i) => {
    const k = kindOf(label);
    if (!nextKind) { boardSpeak(label, rate); return; }
    if (k !== nextKind) { boardSpeak(label, rate); setFrameMsg(`${KIND_NAME[nextKind]} 칸(색이 같은 칸)을 찾아봐요`); return; }
    const tg = slotTarget(k);
    if (tg && !tg.includes(label)) {
      boardSpeak(label, rate); setFrameMsg('다시 해 볼까요?');
      setMissCount(prev => ({ ...prev, [pIdx]: (prev[pIdx] || 0) + 1 }));
      if (i !== undefined && !tries.wrong.includes(i)) setTries(prev => ({ ...prev, wrong: [...prev.wrong, i] }));
      return;
    }
    const fill = [...frameFill, { label, image, kind: k }];
    setFrameFill(fill); setTries({ wrong: [], solved: false }); setFrameMsg('');
    if (fill.length < frameSlots.length) { boardSpeak(label, rate); return; }
    const s = fill.map(f => f.label).join(' ');
    let say = s;
    const nextScore = score[pIdx] === undefined ? { ...score, [pIdx]: !(missCount[pIdx] > 0) } : score;
    setScore(nextScore);
    setTries({ wrong: [], solved: true });
    setFrameMsg('');
    const left = targetPages.filter(x => nextScore[x] === undefined);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (!left.length) { advanceTimer.current = setTimeout(() => setShowResult(true), 1800); }
    else { const nxt = left.find(x => x > pIdx) ?? left[0]; advanceTimer.current = setTimeout(() => setStoryPage(nxt), 1800); }
    boardSpeak(say, rate);
  };
  const onCellClick = (i) => {
    if (!board) return;
    if (mode === 'edit') { setPickIndex(i); return; }
    if (mode === 'hide') {
      updateBoard(b => {
        const cur = b.hidden?.[kidId] ?? b.hidden?.all ?? [];
        const next = cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i];
        return { ...b, hidden: { ...(b.hidden || {}), [kidId]: next } };
      });
      return;
    }
    const src = (mode === 'use' && useCells) ? useCells : board.cells;
    if (!src[i]) return;
    const v = cellView(src[i], i);
    if (!v.label) return;
    if (frameSlots && !tries.solved && !showResult) { frameTap(v.label, v.image, i); return; }
    if (sentenceOn) setSentence(prev => [...prev, { label: v.label, image: v.image }]);
    let say = v.label;
    if (practiceOn && !tries.solved && !waitPick && !showResult) {
      if (answerSet.has(v.label)) {
        say = v.label;
        const nextScore = score[pIdx] === undefined ? { ...score, [pIdx]: tries.wrong.length === 0 } : score;
        setScore(nextScore);
        setTries(prev => ({ ...prev, solved: true }));
        const left = targetPages.filter(k => nextScore[k] === undefined);
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        if (!left.length) {
          advanceTimer.current = setTimeout(() => setShowResult(true), 1000);
        } else if (sortMode && sortMany) {
          setPicked(false);
        } else {
          const nxt = left.find(k => k > pIdx) ?? left[0];
          advanceTimer.current = setTimeout(() => setStoryPage(nxt), 1000);
        }
      } else {
        setMissCount(prev => ({ ...prev, [pIdx]: (prev[pIdx] || 0) + 1 }));
        if (!tries.wrong.includes(i)) setTries(prev => ({ ...prev, wrong: [...prev.wrong, i] }));
      }
    }
    const ok = boardSpeak(say, rate);
    if (!ok && !speechWarned.current) {
      speechWarned.current = true;
      safeAlert('이 브라우저에서는 소리로 읽기를 쓸 수 없어요.\n크롬이나 사파리 최신 버전에서 열어 주세요.');
    }
    setSaying(i);
    if (sayTimer.current) clearTimeout(sayTimer.current);
    sayTimer.current = setTimeout(() => setSaying(null), 900);
  };

  const setCell = (i, patch) => updateBoard(b => ({ ...b, cells: b.cells.map((c, j) => j === i ? { ...c, ...patch } : c) }));

  const doPrint = () => {
    if (!board || !board.cells) return;
    const pagesInfo = board.kind === 'story'
      ? (board.pages || []).map(pg => {
        let image = (pg.cardId && cardMap[pg.cardId]?.image) || pg.image || '';
        if (!image && pg.pageRef) { const [bid, idx] = String(pg.pageRef).split('#'); image = builtinMap[bid]?.pages?.[parseInt(idx, 10)]?.image || ''; }
        return { image, text: pg.text || '', questions: (pg.questions || []).filter(Boolean) };
      })
      : null;
    printBoardWindow(board, board.cells.map(cellView), withChips, pagesInfo);
  };

  const testSound = () => {
    if (!boardSpeak('소리가 잘 들려요', rate)) safeAlert('이 브라우저에서는 소리로 읽기를 쓸 수 없어요.');
  };

  const kidName = kidId === 'all' ? '모든 아이' : (kids.find(k => k.id === kidId)?.name || '모든 아이');
  // 아이별 자주 쓰는 판 (아이 목록에 함께 저장: kid.fav = [판 id])
  const curKid = kidId === 'all' ? null : kids.find(k => k.id === kidId) || null;
  const favIds = (curKid && Array.isArray(curKid.fav)) ? curKid.fav : [];
  const favBoards = favIds.map(id => boards.find(b => b.id === id) || builtins.find(b => b.id === id && !b.unlisted)).filter(Boolean);
  const isFav = !!(activeId && favIds.includes(activeId));
  const toggleFav = () => {
    if (!curKid || !activeId) return;
    const next = isFav ? favIds.filter(x => x !== activeId) : [...favIds, activeId];
    saveKids(kids.map(k => k.id === curKid.id ? { ...k, fav: next } : k));
  };

  // ----- 이야기 판: 위쪽 그림·문장·질문 -----
  const myGroups = useMemo(() => {
    const out = [];
    boards.forEach(b => { const g = (b.group || '').trim(); if (g && !out.includes(g)) out.push(g); });
    return out;
  }, [boards]);
  // 고른 이야기 판의 영상 주소 받기
  useEffect(() => {
    const need = (board?.pages || []).map(pg => pg.videoPath).filter(pth => pth && !videoUrls[pth]);
    if (!need.length) return;
    let cancelled = false;
    resolveSignedUrls(need).then(m => { if (!cancelled && m) setVideoUrls(prev => ({ ...prev, ...m })); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, board?.pages]);
  useEffect(() => {
    const need = (board?.pages || []).map(pg => pg.sharedVideo).filter(pth => pth && videoUrls['shared:' + pth] === undefined);
    if (!need.length) return;
    let cancelled = false;
    sharedMediaSign(need).then(m => {
      if (cancelled || !m) return;
      const add = {}; need.forEach(k => { add['shared:' + k] = m[k] || ''; }); // '' = 영상 없음 → 그림으로 보여 줌
      setVideoUrls(prev => ({ ...prev, ...add }));
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, board?.pages]);
  const isStory = board?.kind === 'story';
  // 칸마다 질문 번호(q)가 있는 판: 질문을 누르면 그 질문의 답 칸만 보임 (아무것도 안 누르면 모두 보임)
  const qGroups = isStory && !!board?.cells?.some(c => c && Number.isInteger(c.q));
  // 답 칸 그림 바꾸기 (cellSets): 같은 낱말을 다른 사람 그림·글자로 보여 줌 — 수업 화면에서만
  const [setChoice, setSetChoice] = useState({});
  const cellSets = Array.isArray(board?.cellSets) && board.cellSets.length ? board.cellSets : null;
  const setIdx = cellSets ? Math.min(cellSets.length - 1, Math.max(0, setChoice[board.id] ?? (() => {
    try { const v = localStorage.getItem('aac_cellset:' + board.id); if (v !== null && v !== '') return parseInt(v, 10); } catch {}
    return board.cellSetDefault || 0;
  })())) : -1;
  const chooseSet = (i) => {
    if (!board) return;
    setSetChoice(prev => ({ ...prev, [board.id]: i }));
    try { localStorage.setItem('aac_cellset:' + board.id, String(i)); } catch {}
  };
  const useCells = useMemo(() => {
    if (!board || !board.cells) return board?.cells || null;
    if (mode !== 'use' || !cellSets) return board.cells;
    const s = cellSets[setIdx];
    if (!s) return board.cells;
    if (s.text) return board.cells.map(c => ({ label: c.label || (c.cardId ? cardMap[c.cardId]?.label : '') || '' }));
    if (s.ref) {
      const rb = builtinMap[s.ref];
      if (!rb || !rb.cells) return board.cells;
      return rb.cells.map((c, i) => ({ label: c.label || '', ref: `${s.ref}#${i}` }));
    }
    if (Array.isArray(s.cells)) return s.cells;
    return board.cells;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, mode, cellSets, setIdx, builtinMap, cardMap]);
  const renderSetPicker = (large) => {
    if (!cellSets || mode !== 'use') return null;
    return (
      <div className="flex items-center justify-end">
        <label className={`flex items-center gap-1.5 text-stone-500 ${large ? 'text-base' : 'text-sm'}`}>
          <ImageIcon className="w-4 h-4" /> 답 칸 그림
          <select value={setIdx} onChange={(e) => chooseSet(parseInt(e.target.value, 10))} aria-label="답 칸 그림"
            className="border border-stone-300 rounded-lg px-2 py-1 bg-white text-stone-700">
            {cellSets.map((s, i) => <option key={i} value={i}>{s.name || `그림 ${i + 1}`}</option>)}
          </select>
        </label>
      </div>
    );
  };
  const sentenceOn = !!board && (board.sentence ?? isStory);
  const pages = isStory ? (board.pages || []) : [];
  const pIdx = Math.min(storyPage, Math.max(0, pages.length - 1));
  const page = pages[pIdx] || null;
  // ----- 정답 연습 -----
  const pageAnswers = (isStory && mode === 'use' && page && Array.isArray(page.answer)) ? page.answer : null;
  const hasAnswers = isStory && (board?.pages || []).some(pg => Array.isArray(pg.answer) && pg.answer.length);
  const practiceOn = !!(practice && pageAnswers && pageAnswers.length);
  // 분류 판(어디에 들어가?): 맞힌 그림이 칸에 쌓이고, 칸 고르기·여러 장 함께를 씀
  const sortMode = practiceOn && !!board?.sort;
  const sortLabels = sortMode ? [...new Set((board.cells || []).map((c, i) => cellView(c, i).label).filter(Boolean))] : [];
  const sortOn = sortMode ? (() => {
    const saved = sortCellsBy[board.id] ?? (() => { try { const v = JSON.parse(localStorage.getItem('aac_sortcells:' + board.id) || 'null'); return Array.isArray(v) ? v : null; } catch { return null; } })();
    const ok = (saved || []).filter(l => sortLabels.includes(l));
    if (ok.length >= 2) return ok;
    // 처음 열 때: 판에 정해 둔 칸(sortDefault)만, 없으면 전부
    const def = (Array.isArray(board.sortDefault) ? board.sortDefault : []).filter(l => sortLabels.includes(l));
    return def.length >= 2 ? def : sortLabels;
  })() : null;
  const pageAns = (pg) => (Array.isArray(pg?.answer) ? pg.answer : []);
  // 이번 연습에 들어가는 쪽 (정답 있는 쪽, 분류 판은 고른 칸의 쪽만)
  const targetPages = (isStory ? pages : []).map((pg, k) => k).filter(k => {
    const a = pageAns(pages[k]);
    if (!a.length) return false;
    return sortOn ? a.some(l => sortOn.includes(l)) : true;
  });
  const waitPick = sortMode && sortMany && !picked;
  // ----- 문장 틀: 칸 색(kinds)과 2칸·3칸 문장 -----
  const KIND_COLOR = { who: '#E8A800', what: '#E07A2E', pos: '#3D6FB6', do: '#3D8B5A', ask: '#C25A86' };
  const KIND_NAME = { who: '누가', what: board?.frame && Object.values(board.frame).some(s => s.includes('pos')) ? '무엇' : '어디가', pos: '어디', do: '어때요', ask: '부탁' };
  const kindOf = (label) => ((board?.frameWho || []).some(w => w.label === label) ? 'who' : (board?.kinds ? board.kinds[label] : undefined));
  const frameN = (() => {
    if (!board?.frame) return 0;
    const v = frameBy[board.id] ?? (() => { try { return parseInt(localStorage.getItem('aac_frame:' + board.id) || '0', 10) || 0; } catch { return 0; } })();
    return board.frame[v] ? v : 0;
  })();
  const setFrameN = (v) => { if (!board) return; setFrameBy(prev => ({ ...prev, [board.id]: v })); try { localStorage.setItem('aac_frame:' + board.id, String(v)); } catch {} setFrameFill([]); setFrameMsg(''); setTries({ wrong: [], solved: false }); };
  const frameSlots = (practiceOn && !board?.sort && frameN && board?.frame?.[frameN]) ? board.frame[frameN] : null;
  const nextKind = frameSlots && frameFill.length < frameSlots.length ? frameSlots[frameFill.length] : null;
  const slotTarget = (k) => {
    const a = pageAnswers || [];
    if (a.length && kindOf(a[0]) === k) return a;
    const pa = page?.slotAns?.[k];
    if (pa) return Array.isArray(pa) ? pa : [pa];
    const fx = board?.frameFixed?.[k];
    return fx ? [fx] : null; // null = 그 색 칸이면 무엇이든
  };
  const answerSet = new Set((waitPick || showResult) ? [] : (frameSlots ? (nextKind ? (slotTarget(nextKind) || []) : []) : (pageAnswers || [])));
  const flashAnswer = practiceOn && !waitPick && !showResult && !tries.solved && tries.wrong.length >= 2;
  const restartPractice = (first) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setScore({}); setMissCount({}); setShowResult(false); setPicked(false); setTries({ wrong: [], solved: false });
    setStoryPage(first ?? targetPages[0] ?? 0);
  };
  const toggleSortCell = (label) => {
    if (!sortOn) return;
    const next = sortOn.includes(label) ? sortOn.filter(l => l !== label) : sortLabels.filter(l => l === label || sortOn.includes(l));
    if (next.length < 2) return;
    setSortCellsBy(prev => ({ ...prev, [board.id]: next }));
    try { localStorage.setItem('aac_sortcells:' + board.id, JSON.stringify(next)); } catch {}
    const first = pages.findIndex(pg => pageAns(pg).some(l => next.includes(l)));
    restartPractice(first < 0 ? 0 : first);
  };
  // 분류 판: 지금 쪽이 고른 칸에 없으면 첫 쪽으로
  useEffect(() => {
    if (!sortMode || !targetPages.length || targetPages.includes(pIdx)) return;
    setStoryPage(targetPages.find(k => score[k] === undefined) ?? targetPages[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, pIdx, targetPages.join(',')]);
  const pageImg = (pg) => {
    if (!pg) return '';
    let im = pg.cardId ? cardMap[pg.cardId]?.image : (pg.image || '');
    if (!im && pg.pageRef) { const [bid, idx] = String(pg.pageRef).split('#'); im = builtinMap[bid]?.pages?.[parseInt(idx, 10)]?.image || ''; }
    return im || '';
  };
  // 보기 수: 정답 + 나머지에서 쪽마다 고정된 순서로 몇 개만
  const shownIdx = useMemo(() => {
    if (!practiceOn || !choiceN || board?.sort) return null;
    const cells = useCells || board?.cells || [];
    const ans = [], rest = [];
    cells.forEach((c, i) => { const l = cellView(c, i).label; if (!l) return; (answerSet.has(l) ? ans : rest).push(i); });
    let seed = (pIdx + 1) * 9301 + String(board?.id || '').length * 49297;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const mixed = rest.map(i => [rnd(), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
    return new Set([...ans, ...mixed.slice(0, Math.max(0, choiceN - ans.length))]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceOn, choiceN, pIdx, useCells, board?.id, (pageAnswers || []).join('|')]);
  // 정답 연습 때는 칸 자리를 쪽마다 섞어서 보여 줌 (정답이 늘 같은 자리에 오지 않게)
  const practiceOrder = useMemo(() => {
    if (!practiceOn || board?.sort) return null;
    const n = (useCells || board?.cells || []).length;
    let seed = (pIdx + 7) * 7919 + String(board?.id || '').length * 104729;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const m = new Map();
    Array.from({ length: n }, (_, i) => [rnd(), i]).sort((x, y) => x[0] - y[0]).forEach(([, i], k) => m.set(i, k));
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceOn, pIdx, useCells, board?.id]);
  const doneN = targetPages.filter(k => score[k] !== undefined).length;
  const scoreN = doneN, scoreOk = targetPages.filter(k => score[k] === true).length;
  const renderPractice = (large) => {
    if (mode !== 'use') return null;
    const canSet = hasAnswers || !!cellSets;
    if (!hasAnswers && !canSet) return null;
    const pct = targetPages.length ? Math.round(doneN / targetPages.length * 100) : 0;
    return (
      <div className={`flex items-center gap-2 flex-1 min-w-0 ${large ? 'text-base' : 'text-sm'}`}>
        {hasAnswers && (
          <button onClick={() => setPractice(v => !v)} aria-pressed={practice}
            className="rounded-full border-2 px-3 py-1 font-bold flex items-center gap-1 flex-none"
            style={practice ? { borderColor: BOARD_PINK, background: BOARD_PINK, color: '#fff' } : { borderColor: BOARD_PINK, color: '#993556', background: '#fff' }}>
            <Check className="w-4 h-4" /> 정답 연습
          </button>
        )}
        <span className="flex items-center gap-1.5 flex-1 min-w-0">
          {hasAnswers && practice && targetPages.length > 0 && (<>
            <span className="block flex-1 max-w-[14rem] h-2 rounded-full bg-stone-200 overflow-hidden"><span className="block h-full transition-all" style={{ width: pct + '%', background: '#2E9E5B' }} /></span>
            <b className="text-stone-700 whitespace-nowrap">{targetPages.length}장 중 {doneN}장</b>
          </>)}
          {hasAnswers && practice && scoreN > 0 && !showResult && doneN >= targetPages.length && <button onClick={() => setShowResult(true)} className="text-xs underline text-stone-500 whitespace-nowrap">결과 보기</button>}
        </span>
        {canSet && (
          <button onClick={() => setShowPracSet(true)} className="rounded-full border border-stone-300 bg-white px-3 py-1 font-bold text-stone-700 flex items-center gap-1 flex-none">
            <Settings2 className="w-4 h-4" /> 설정
          </button>
        )}
      </div>
    );
  };
  const renderPracticeSettings = () => {
    if (!showPracSet || !board) return null;
    const chip = (on) => (on ? { borderColor: BOARD_PINK, background: '#FDEEF2', color: '#2B2326' } : { borderColor: '#E7E1E3', background: '#fff', color: '#5B5054' });
    const Row = ({ label, children }) => (
      <div className="flex items-start gap-3 py-2.5 border-b border-stone-100 flex-wrap">
        <b className="w-24 flex-none text-sm text-stone-700 pt-1">{label}</b>
        <div className="flex gap-1.5 flex-wrap flex-1 min-w-0">{children}</div>
      </div>
    );
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowPracSet(false)}>
        <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="정답 연습 설정">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-100">
            <b className="text-lg text-stone-900">{hasAnswers ? '정답 연습 설정' : '설정'}</b>
            <button onClick={() => setShowPracSet(false)} className="ml-auto p-1 text-stone-400" aria-label="닫기"><X className="w-5 h-5" /></button>
          </div>
          <div className="overflow-auto px-4 pb-4">
            {hasAnswers && practice && !board.sort && (
              <Row label="보기 수">
                {[[1, '1개 (정답만)'], [2, '2개'], [3, '3개'], [0, '전체']].map(([v, l]) => (
                  <button key={v} onClick={() => setChoiceN(v)} aria-pressed={choiceN === v} className="rounded-full border-2 px-3 py-1 text-sm font-bold" style={chip(choiceN === v)}>{l}</button>
                ))}
              </Row>
            )}
            {hasAnswers && practice && board.frame && (
              <Row label="답하는 방법">
                {[[0, '낱말로'], ...[2, 3].filter(n => board.frame[n]).map(n => [n, `문장으로 (${n}칸)`])].map(([v, l]) => (
                  <button key={v} onClick={() => setFrameN(v)} aria-pressed={frameN === v} className="rounded-full border-2 px-3 py-1 text-sm font-bold" style={chip(frameN === v)}>{l}</button>
                ))}
              </Row>
            )}
            {sortMode && (
              <Row label="칸 고르기">
                {sortLabels.map(l => (
                  <button key={l} onClick={() => toggleSortCell(l)} aria-pressed={sortOn.includes(l)} className="rounded-full border-2 px-3 py-1 text-sm font-bold" style={chip(sortOn.includes(l))}>{l}</button>
                ))}
              </Row>
            )}
            {sortMode && (
              <Row label="카드 보여 주기">
                {[[false, '한 장씩'], [true, '여러 장 함께']].map(([v, l]) => (
                  <button key={l} onClick={() => { setSortMany(v); setPicked(false); setTries({ wrong: [], solved: false }); }} aria-pressed={sortMany === v} className="rounded-full border-2 px-3 py-1 text-sm font-bold" style={chip(sortMany === v)}>{l}</button>
                ))}
              </Row>
            )}
            {cellSets && (
              <Row label="답 칸 그림">
                {cellSets.map((s, i) => (
                  <button key={i} onClick={() => chooseSet(i)} aria-pressed={setIdx === i} className="rounded-full border-2 px-3 py-1 text-sm font-bold" style={chip(setIdx === i)}>{s.name || `그림 ${i + 1}`}</button>
                ))}
              </Row>
            )}
            {hasAnswers && practice && (
              <Row label="다시 하기">
                <button onClick={() => { restartPractice(); setShowPracSet(false); }} className="rounded-full border-2 px-3 py-1 text-sm font-bold" style={chip(false)}>처음부터</button>
                {scoreN > 0 && <span className="text-sm text-stone-500 self-center">한 번에 맞힘 <b className="text-stone-800">{scoreOk}</b> / {scoreN}</span>}
              </Row>
            )}
            {hasAnswers && !practice && <p className="text-sm text-stone-500 pt-3">정답 연습을 켜면 보기 수·처음부터 같은 설정이 더 나와요.</p>}
          </div>
        </div>
      </div>
    );
  };
  const renderSortSettings = (large) => {
    if (!sortMode) return null;
    return (
      <div className={`flex items-center gap-1.5 flex-wrap ${large ? 'text-base' : 'text-sm'}`}>
        <span className="text-stone-500 font-bold mr-0.5">칸 고르기</span>
        {sortLabels.map(l => {
          const on = sortOn.includes(l);
          const ci = (board.cells || []).findIndex((c, i) => cellView(c, i).label === l);
          const im = ci >= 0 ? cellView((useCells || board.cells)[ci] || board.cells[ci], ci).image : '';
          return (
            <button key={l} onClick={() => toggleSortCell(l)} aria-pressed={on}
              className="rounded-full border-2 px-2.5 py-0.5 font-bold flex items-center gap-1"
              style={on ? { borderColor: BOARD_PINK, background: '#FDEEF2', color: '#2B2326' } : { borderColor: '#E7E1E3', background: '#fff', color: '#8A7E82' }}>
              {im && <img src={im} alt="" className="w-4 h-4 object-contain" draggable={false} />}{l}
            </button>
          );
        })}
        <span className="text-stone-500 font-bold ml-2 mr-0.5">카드 보여 주기</span>
        <span className="inline-flex rounded-full border-2 border-stone-200 overflow-hidden">
          {[[false, '한 장씩'], [true, '여러 장 함께']].map(([v, l]) => (
            <button key={l} onClick={() => { setSortMany(v); setPicked(false); setTries({ wrong: [], solved: false }); }} aria-pressed={sortMany === v}
              className="px-3 py-0.5 font-bold" style={sortMany === v ? { background: BOARD_PINK, color: '#fff' } : { background: '#fff', color: '#8A7E82' }}>{l}</button>
          ))}
        </span>
      </div>
    );
  };
  const renderResult = (large) => {
    const ok = targetPages.filter(k => score[k] === true).length;
    return (
      <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 space-y-3">
        <div>
          <p className={`font-bold text-stone-800 ${large ? 'text-2xl' : 'text-xl'}`}>다 했어요! 🎉</p>
          <p className="text-sm text-stone-500">{targetPages.length}장 중 <b className="text-stone-800">{ok}장</b>을 한 번에 맞혔어요.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-stone-500 border-b border-stone-200">
              <th className="py-1.5 px-2 font-bold">#</th><th className="py-1.5 px-2 font-bold">그림</th><th className="py-1.5 px-2 font-bold">정답</th><th className="py-1.5 px-2 font-bold">결과</th><th className="py-1.5 px-2 font-bold">틀린 횟수</th>
            </tr></thead>
            <tbody>
              {targetPages.map((k, n) => {
                const pg = pages[k], im = pageImg(pg), good = score[k] === true;
                return (
                  <tr key={k} className="border-b border-stone-100 whitespace-nowrap">
                    <td className="py-1.5 px-2 text-stone-400">{n + 1}</td>
                    <td className="py-1.5 px-2 whitespace-normal min-w-[9rem]"><span className="inline-flex items-center gap-2">{im && <img src={im} alt="" className="w-9 h-9 object-contain flex-none" draggable={false} />}<span className="break-keep">{pg.text || ''}</span></span></td>
                    <td className="py-1.5 px-2">{pageAns(pg).join(', ')}</td>
                    <td className="py-1.5 px-2"><span className="rounded-full px-2.5 py-0.5 text-xs font-bold" style={good ? { background: '#E6F6EC', color: '#2E9E5B' } : { background: '#FDECEC', color: '#D9534F' }}>{good ? '정반응' : '오반응'}</span></td>
                    <td className="py-1.5 px-2">{missCount[k] || 0}회</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={() => restartPractice()} className="rounded-full px-4 py-1.5 font-bold text-white" style={{ background: BOARD_PINK }}>같은 설정으로 다시 하기</button>
      </div>
    );
  };
  const renderPool = (large) => {
    const left = targetPages.filter(k => score[k] === undefined);
    return (
      <div className="rounded-2xl border-2 border-stone-200 bg-white p-3 space-y-2">
        <p className="text-center text-sm text-stone-500">{picked ? '들어갈 칸을 눌러요.' : '그림을 하나 고르고, 들어갈 칸을 눌러요.'}</p>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${large ? 110 : 84}px, 1fr))` }}>
          {left.map(k => {
            const pg = pages[k], im = pageImg(pg), sel = picked && k === pIdx;
            return (
              <button key={k} onClick={() => { if (advanceTimer.current) clearTimeout(advanceTimer.current); if (k !== pIdx) setStoryPage(k); else setTries({ wrong: [], solved: false }); setPicked(true); speakText(pg.text || ''); }}
                className="rounded-xl border-2 bg-white p-1.5 flex flex-col items-center transition"
                style={sel ? { borderColor: BOARD_PINK, boxShadow: `0 0 0 3px ${BOARD_PINK}55`, transform: 'translateY(-2px)' } : { borderColor: '#E7E1E3' }}>
                {im ? <img src={im} alt={pg.text || ''} className="w-full aspect-square object-contain" draggable={false} /> : <span className="w-full aspect-square" />}
                {pg.text && <span className="text-xs font-bold text-stone-700">{pg.text}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  const speakText = (t) => {
    if (!t) return;
    if (!boardSpeak(t, rate) && !speechWarned.current) {
      speechWarned.current = true;
      safeAlert('이 브라우저에서는 소리로 읽기를 쓸 수 없어요.\n크롬이나 사파리 최신 버전에서 열어 주세요.');
    }
  };
  const setPage = (patch) => updateBoard(b => ({ ...b, pages: (b.pages || []).map((pg, j) => j === pIdx ? { ...pg, ...patch } : pg) }));
  const renderStory = (large) => {
    if (!isStory) return null;
    if (board.builtin && !board.cells) return null;
    if (!page) {
      return (
        <div className="rounded-2xl border-2 border-dashed border-stone-300 py-10 text-center text-sm text-stone-500 space-y-2">
          <p>이야기 쪽이 없어요.</p>
          {mode === 'edit' && <button onClick={() => updateBoard(b => ({ ...b, pages: [{ cardId: null, text: '', questions: [...STORY_DEFAULT_QUESTIONS] }] }))}
            className="px-3 py-1.5 rounded-lg border border-stone-300">쪽 더하기</button>}
        </div>
      );
    }
    if (practice && mode === 'use' && showResult && hasAnswers) {
      return (
        <div className="space-y-3">
          {renderResult(large)}
          <div className="flex items-center gap-2">{renderPractice(large)}</div>
        </div>
      );
    }
    if (sortMode && sortMany) {
      return (
        <div className="space-y-3">
          {renderPool(large)}
          <div className="flex items-center gap-2">{renderPractice(large)}</div>
        </div>
      );
    }
    let img = page.cardId ? cardMap[page.cardId]?.image : (page.image || '');
    if (!img && page.pageRef) {
      const [bid, idx] = String(page.pageRef).split('#');
      img = builtinMap[bid]?.pages?.[parseInt(idx, 10)]?.image || '';
    }
    let vkey = page.videoPath || (page.sharedVideo ? 'shared:' + page.sharedVideo : '');
    if (vkey && videoUrls[vkey] === '' && img) vkey = ''; // 영상을 못 받으면 그림으로
    const vurl = vkey ? videoUrls[vkey] : '';
    const qs = (page.questions || []).filter(q => (q || '').trim());
    const replay = () => { const v = videoRef.current; if (v) { try { v.currentTime = 0; v.play(); } catch {} } };
    return (
      <div className="space-y-3">
        <div className="grid items-center gap-2" style={{ gridTemplateColumns: '44px minmax(0,1fr) 44px' }}>
          <button onClick={() => setStoryPage(Math.max(0, pIdx - 1))} disabled={pIdx === 0}
            className="h-12 rounded-xl border border-stone-200 bg-white flex items-center justify-center disabled:opacity-30" aria-label="앞 쪽"><ChevronDown className="w-5 h-5 rotate-90" /></button>
          {vkey ? (
            <div className="rounded-2xl border-2 border-stone-200 bg-white p-2 flex flex-col items-center justify-center gap-2">
              <div className="relative w-full">
                {vurl
                  ? <video key={vkey} ref={videoRef} src={vurl} autoPlay playsInline preload="auto" muted={videoMuted}
                      onClick={replay} className={`w-full rounded-xl bg-stone-900 object-contain ${large ? 'max-h-[52vh]' : 'max-h-80'}`} />
                  : <div className="w-full aspect-video rounded-xl bg-stone-100 flex items-center justify-center text-sm text-stone-400">영상을 불러오는 중…</div>}
                {vurl && (
                  <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
                    <button onClick={toggleVideoMuted} aria-pressed={videoMuted} className="rounded-full bg-white/90 border border-stone-200 px-3 py-1.5 text-sm font-bold text-stone-700 flex items-center gap-1">
                      {videoMuted ? <><Volume2 className="w-4 h-4" /> 소리 켜기</> : <><VolumeX className="w-4 h-4" /> 소리 끄기</>}
                    </button>
                    <button onClick={replay} className="rounded-full bg-white/90 border border-stone-200 px-3 py-1.5 text-sm font-bold text-stone-700 flex items-center gap-1">
                      <RotateCw className="w-4 h-4" /> 다시 보기
                    </button>
                  </div>
                )}
              </div>
              {page.text && (
                <button onClick={() => speakText(page.text)} className={`font-bold text-stone-800 text-center ${large ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{page.text}</button>
              )}
            </div>
          ) : (
          <button onClick={() => mode === 'edit' ? setPickPage(true) : speakText(page.text)}
            className="rounded-2xl border-2 border-stone-200 bg-white p-2 flex flex-col items-center justify-center gap-2">
            {img
              ? <img src={img} alt={page.text} className={`w-full object-contain rounded-xl ${large ? 'max-h-[48vh]' : 'max-h-72'}`} draggable={false} />
              : <span className="py-12 text-stone-400 text-sm flex flex-col items-center gap-1"><ImageIcon className="w-8 h-8" />{mode === 'edit' ? '눌러서 그림 넣기' : '그림 없음'}</span>}
            {page.text && <span className={`font-bold text-stone-800 text-center ${large ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{page.text}</span>}
          </button>
          )}
          <button onClick={() => setStoryPage(Math.min(pages.length - 1, pIdx + 1))} disabled={pIdx >= pages.length - 1}
            className="h-12 rounded-xl border border-stone-200 bg-white flex items-center justify-center disabled:opacity-30" aria-label="다음 쪽"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
        </div>
        {(qGroups || mode !== 'use') && <div className="flex items-center justify-center gap-2 flex-wrap">
          {qs.map((q, k) => {
            const on = qGroups && qOn.includes(k);
            return (
              <button key={k} onClick={() => { speakText(q); if (qGroups && mode === 'use') setQOn(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]); }}
                className={`rounded-full border-2 flex items-center gap-1.5 font-bold ${large ? 'px-5 py-2.5 text-lg' : 'px-4 py-1.5 text-sm'}`}
                style={on ? { borderColor: BOARD_PINK, background: BOARD_PINK, color: '#fff' } : { borderColor: BOARD_PINK, color: '#993556', background: '#fff' }}
                aria-pressed={qGroups ? on : undefined}><Volume2 className="w-4 h-4" /> {q}</button>
            );
          })}
        </div>}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 flex-none">{pIdx + 1} / {pages.length}쪽</span>
          {renderPractice(large)}
          {mode !== 'use' && <div className="flex-1" />}
        </div>
        {mode === 'edit' && (
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">이 쪽 문장
              <input value={page.text || ''} onChange={(e) => setPage({ text: e.target.value })} placeholder="예: 민수가 그네를 타요."
                className="flex-1 border border-stone-300 rounded-md px-2 py-1" />
            </label>
            {(page.questions || []).map((q, k) => (
              <div key={k} className="flex items-center gap-2">
                <span className="flex-shrink-0">질문 {k + 1}</span>
                <input value={q} onChange={(e) => setPage({ questions: page.questions.map((x, j) => j === k ? e.target.value : x) })}
                  className="flex-1 border border-stone-300 rounded-md px-2 py-1" />
                <button onClick={() => setPage({ questions: page.questions.filter((_, j) => j !== k) })} className="p-1 text-stone-500" aria-label="질문 지우기"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button onClick={() => setPage({ questions: [...(page.questions || []), ''] })} className="px-2.5 py-1 rounded-md border border-stone-300 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> 질문 더하기</button>
              <button onClick={() => setPickPage(true)} className="px-2.5 py-1 rounded-md border border-stone-300 flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /> 그림 넣기</button>
              <input ref={pageVideoInput} type="file" accept="video/*" className="hidden" onChange={async (e) => {
                const f = e.target.files && e.target.files[0]; e.target.value = '';
                if (!f) return;
                setVideoBusy(true);
                const path = await uploadStoryVideo(f);
                setVideoBusy(false);
                if (!path) { safeAlert('영상을 올리지 못했어요.\n저장 공간이 영상을 받지 않도록 설정되어 있을 수 있어요.'); return; }
                const old = page.videoPath;
                setPage({ videoPath: path, cardId: null });
                if (old) storageRemove([old]).catch(() => {});
              }} />
              <button onClick={() => pageVideoInput.current?.click()} disabled={videoBusy} className="px-2.5 py-1 rounded-md border border-stone-300 flex items-center gap-1 disabled:opacity-50">
                <RotateCw className={`w-3.5 h-3.5 ${videoBusy ? 'animate-spin' : ''}`} /> {videoBusy ? '영상 올리는 중…' : '영상 넣기'}
              </button>
              <div className="flex-1" />
              <button onClick={() => {
                updateBoard(b => { const ps = [...(b.pages || [])]; ps.splice(pIdx + 1, 0, { cardId: null, text: '', questions: [...STORY_DEFAULT_QUESTIONS] }); return { ...b, pages: ps }; });
                setStoryPage(pIdx + 1);
              }} className="px-2.5 py-1 rounded-md border border-stone-300 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> 뒤에 쪽 더하기</button>
              <button disabled={pIdx === 0} onClick={() => {
                updateBoard(b => { const ps = [...(b.pages || [])]; [ps[pIdx - 1], ps[pIdx]] = [ps[pIdx], ps[pIdx - 1]]; return { ...b, pages: ps }; });
                setStoryPage(pIdx - 1);
              }} className="px-2.5 py-1 rounded-md border border-stone-300 disabled:opacity-30">앞으로</button>
              <button disabled={pIdx >= pages.length - 1} onClick={() => {
                updateBoard(b => { const ps = [...(b.pages || [])]; [ps[pIdx + 1], ps[pIdx]] = [ps[pIdx], ps[pIdx + 1]]; return { ...b, pages: ps }; });
                setStoryPage(pIdx + 1);
              }} className="px-2.5 py-1 rounded-md border border-stone-300 disabled:opacity-30">뒤로</button>
              <button onClick={() => {
                if (!safeConfirm(`${pIdx + 1}쪽을 지울까요?`)) return;
                if (page.videoPath) storageRemove([page.videoPath]).catch(() => {});
                updateBoard(b => ({ ...b, pages: (b.pages || []).filter((_, j) => j !== pIdx) }));
                setStoryPage(Math.max(0, pIdx - 1));
              }} className="px-2.5 py-1 rounded-md border border-stone-300 text-red-600 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> 이 쪽 지우기</button>
            </div>
          </div>
        )}
        <div className="border-t border-stone-200" />
      </div>
    );
  };

  const renderSentenceBar = (large) => {
    if (!sentenceOn || mode !== 'use' || !sentence.length) return null;
    const text = sentence.map(w => w.label).join(' ');
    return (
      <div className="flex items-stretch gap-2 mb-3">
        <button onClick={() => text && speakText(text)}
          className={`flex-1 rounded-2xl border-2 bg-white px-2 py-1.5 flex items-center gap-1.5 flex-wrap text-left ${large ? 'min-h-[96px]' : 'min-h-[72px]'}`}
          style={{ borderColor: BOARD_PINK }} aria-label="문장 읽기">
          {sentence.length === 0
            ? <span className="text-sm text-stone-400 pl-2">낱말을 눌러 문장을 만들어요</span>
            : sentence.map((w, k) => (
              <span key={k} className="flex flex-col items-center bg-stone-50 border border-stone-200 rounded-lg px-1.5 py-1">
                {w.image && <img src={w.image} alt="" className={`object-contain ${large ? 'w-16 h-16' : 'w-11 h-11'}`} draggable={false} />}
                <span className={`font-bold text-stone-800 ${large ? 'text-base' : 'text-xs'}`}>{w.label}</span>
              </span>
            ))}
        </button>
        <button onClick={() => setSentence(prev => prev.slice(0, -1))} className="w-14 rounded-2xl border border-stone-200 bg-white flex flex-col items-center justify-center text-stone-600 text-[11px] gap-0.5" aria-label="하나 지우기">
          <X className="w-5 h-5" />하나
        </button>
        <button onClick={() => setSentence([])} className="w-14 rounded-2xl border border-stone-200 bg-white flex flex-col items-center justify-center text-stone-600 text-[11px] gap-0.5" aria-label="모두 지우기">
          <Trash2 className="w-5 h-5" />모두
        </button>
      </div>
    );
  };

  const renderFrameBar = (large) => {
    if (!frameSlots) return null;
    return (
      <div className="mb-3 space-y-1.5">
        <div className="flex items-stretch gap-1.5 sm:gap-2 rounded-2xl border-2 border-dashed border-stone-200 p-1.5 sm:p-2">
          {frameSlots.map((k, j) => {
            const f = frameFill[j], col = KIND_COLOR[k], waiting = !f && k !== nextKind;
            return (
              <div key={j} className={`flex-1 min-w-0 rounded-xl border-[3px] px-1.5 sm:px-2 py-1.5 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 text-center sm:text-left ${large ? 'min-h-[84px]' : 'min-h-[64px]'}`}
                style={{ borderColor: col, borderStyle: waiting ? 'dashed' : 'solid', background: waiting ? '#fff' : col + '1F', opacity: waiting ? 0.55 : 1 }}>
                <span className="rounded-full px-2 py-0.5 text-xs font-black text-white flex-none" style={{ background: col }}>{KIND_NAME[k]}</span>
                {f ? (<>
                  {f.image && <img src={f.image} alt="" className={`object-contain rounded-md bg-white flex-none ${large ? 'w-14 h-14' : 'w-10 h-10 sm:w-11 sm:h-11'}`} draggable={false} />}
                  <b className={`text-stone-800 leading-tight break-keep ${large ? 'text-xl' : 'text-base sm:text-lg'}`}>{f.label}</b>
                </>) : <span className="text-xs sm:text-sm text-stone-400 break-keep">{k === nextKind ? '여기에 넣어요' : ''}</span>}
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-bold min-h-[20px]" style={{ color: '#2E9E5B' }}>{frameMsg}</p>
      </div>
    );
  };
  const renderGrid = (large) => {
    if (!board) return null;
    if (!board.cells) return <div className="py-16 text-center text-stone-500 text-sm">판을 불러오는 중…</div>;
    const whoCells = frameSlots && frameSlots.includes('who') ? (board.frameWho || []) : [];
    return (<>
      {frameSlots ? renderFrameBar(large) : renderSentenceBar(large)}
      {!isStory && cellSets && mode === 'use' && <div className="mb-3 flex justify-end">{renderPractice(large)}</div>}
      <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${narrow ? Math.min(board.cols || 4, 3) : (board.cols || 4)}, minmax(0, 1fr))` }}>
        {whoCells.map((c, j) => (
          <button key={'who' + j} onClick={() => frameTap(c.label, c.image)}
            className="relative rounded-2xl border-[3px] bg-white flex flex-col p-1.5 pt-2.5 aspect-square items-center justify-center overflow-hidden transition active:scale-95"
            style={{ borderColor: KIND_COLOR.who, opacity: nextKind && nextKind !== 'who' ? 0.35 : 1 }}>
            <span className="absolute left-0 right-0 top-0 h-1.5" style={{ background: KIND_COLOR.who }} />
            {c.image && <img src={c.image} alt={c.label} className="w-full h-[72%] object-contain" draggable={false} />}
            <span className={`font-bold text-stone-800 leading-tight text-center ${large ? 'text-lg sm:text-2xl' : 'text-sm sm:text-base'}`}>{c.label}</span>
          </button>
        ))}
        {(useCells || board.cells).map((cell, i) => {
          if (mode === 'use' && qGroups && qOn.length && Number.isInteger(cell.q) && !qOn.includes(cell.q)) return null;
          if (shownIdx && !shownIdx.has(i)) return null;
          const v = cellView(cell, i);
          if (sortMode && v.label && !sortOn.includes(v.label)) return null;
          const isAns = practiceOn && answerSet.has(v.label);
          const kc = mode === 'use' && v.label ? KIND_COLOR[kindOf(v.label)] : null;
          const frameDim = !!(frameSlots && nextKind && kindOf(v.label) !== nextKind);
          const isWrong = practiceOn && !waitPick && !showResult && tries.wrong.includes(i);
          const empty = !v.image && !v.label;
          // 수업 화면: 숨긴 칸·빈 칸은 자리만 남김 (아이가 누를 것만 보이게)
          if (mode === 'use' && (v.hidden || empty)) return <div key={i} className="aspect-square" aria-hidden="true" />;
          return (
            <button key={i} onClick={() => onCellClick(i)}
              className={`relative rounded-2xl border-2 bg-white flex flex-col p-1.5 transition active:scale-95 ${sortMode && v.label ? 'items-start justify-start min-h-[150px]' : 'aspect-square items-center justify-center'} ${
                v.hidden ? 'border-dashed border-stone-300 opacity-40' : empty ? 'border-dashed border-stone-300' : 'border-stone-200'} ${
                isWrong || frameDim ? 'opacity-40' : ''} ${isAns && flashAnswer ? 'animate-pulse' : ''} ${kc ? 'overflow-hidden pt-2.5' : ''}`}
              style={{ ...(kc ? { borderColor: kc, borderWidth: 3 } : {}), ...(isAns && (tries.solved || flashAnswer) ? { borderColor: '#2E9E5B', boxShadow: '0 0 0 4px #2E9E5B55' }
                : saying === i ? { borderColor: BOARD_PINK, boxShadow: `0 0 0 3px ${BOARD_PINK}55` } : {}), ...(practiceOrder ? { order: practiceOrder.get(i) } : {}) }}>
              {kc && <span className="absolute left-0 right-0 top-0 h-1.5" style={{ background: kc }} />}
              {sortMode && v.label ? (() => {
                const got = targetPages.filter(k => score[k] !== undefined && pageAns(pages[k]).includes(v.label));
                return (<>
                  <span className="flex items-center gap-1.5 w-full">
                    {v.image && <img src={v.image} alt="" className={`object-contain ${large ? 'w-12 h-12' : 'w-9 h-9'}`} draggable={false} />}
                    <span className={`font-bold text-stone-800 leading-tight text-left ${large ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>{v.label}</span>
                  </span>
                  <span className="grid gap-1 w-full mt-1.5" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${large ? 48 : 36}px, 1fr))` }}>
                    {got.map(k => { const im = pageImg(pages[k]); return im ? <img key={k} src={im} alt={pages[k].text || ''} className="w-full aspect-square object-contain rounded-md border border-stone-200 bg-white" draggable={false} /> : null; })}
                  </span>
                </>);
              })() : (<>
              {v.image
                ? <img src={v.image} alt={v.label} className={`w-full object-contain ${board.showLabel !== false && v.label ? 'h-[72%]' : 'h-full'}`} draggable={false} />
                : (empty && mode === 'edit' ? <Plus className="w-8 h-8 text-stone-300" /> : null)}
              {board.showLabel !== false && v.label && (
                <span className={`font-bold text-stone-800 leading-tight text-center ${large ? 'text-lg sm:text-2xl' : 'text-sm sm:text-base'}`}>{v.label}</span>
              )}
              </>)}
              {v.missing && mode === 'edit' && <span className="absolute top-1 left-1 text-[10px] text-red-500">그림 없음</span>}
              {mode === 'hide' && (
                <span className="absolute top-1 right-1 text-[11px] px-1.5 rounded bg-stone-100 text-stone-600">{v.hidden ? '숨김' : '보임'}</span>
              )}
            </button>
          );
        })}
      </div>
    </>);
  };

  if (!loaded) {
    return <div className="py-16 text-center text-stone-500 text-sm">판을 불러오는 중…</div>;
  }

  return (
    <div className="space-y-3">
      {/* 위 도구 줄: 판 이름 · 아이 · 크게 보기 · ☰ */}
      <div className="flex items-center gap-2">
        <button onClick={() => { setPickQ(''); setPickArea(null); setShowPicker(true); }}
          className="flex-1 min-w-0 flex items-center gap-2 rounded-xl border-2 bg-white pl-1.5 pr-2.5 py-1 text-left" style={{ borderColor: BOARD_PINK }} aria-haspopup="dialog">
          {(() => { const th = board?.thumb || (board && (board.cells || []).map((c, i) => cellView(c, i).image).find(Boolean)); return th
            ? <img src={th} alt="" className="w-8 h-8 rounded-md object-contain bg-white flex-none" draggable={false} />
            : <span className="w-8 h-8 rounded-md flex items-center justify-center flex-none" style={{ background: '#FDEEF2', color: BOARD_PINK }}><FolderOpen className="w-4 h-4" /></span>; })()}
          <span className="font-bold text-stone-800 truncate flex-1 min-w-0">{board ? board.name : '판 고르기'}</span>
          <ChevronDown className="w-4 h-4 text-stone-500 flex-none" />
        </button>
        <select value={kidId} onChange={(e) => onKidChange(e.target.value)} aria-label="아이"
          className="flex-none border border-stone-300 rounded-full px-2.5 py-1.5 text-sm font-bold bg-white text-stone-700 max-w-[5.5rem] sm:max-w-[8rem]">
          <option value="all">모든 아이</option>
          {kids.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
          <option value="__add__">+ 아이 추가</option>
        </select>
        {board && mode === 'use' && (
          <button onClick={() => { setMode('use'); setBig(true); }} className="flex-none w-10 h-10 rounded-xl border border-stone-300 bg-white flex items-center justify-center text-stone-700" aria-label="크게 보기" title="크게 보기"><Maximize2 className="w-4 h-4" /></button>
        )}
        <div className="relative flex-none">
          <button onClick={() => setMenuOpen(o => !o)} aria-expanded={menuOpen} aria-label="메뉴" title="메뉴"
            className={`w-10 h-10 rounded-xl border flex items-center justify-center text-stone-700 ${menuOpen ? 'bg-stone-100 border-stone-400' : 'bg-white border-stone-300'}`}>
            <Menu className="w-5 h-5" />
          </button>
          {menuOpen && (<>
            <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 mt-1 z-30 w-56 rounded-xl border border-stone-200 bg-white shadow-lg p-1 text-sm" onClick={() => setMenuOpen(false)}>
              {curKid && board && <button onClick={toggleFav} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2 font-bold" style={{ color: '#9A6B00' }}>{isFav ? '★' : '☆'} {curKid.name} 자주 쓰는 판{isFav ? '에서 빼기' : '에 넣기'}</button>}
              {curKid && board && <div className="my-1 border-t border-stone-100" />}
              {board && <button onClick={() => {
                if (board.builtin) { if (safeConfirm('기본 판은 그대로 두고, 내 판으로 복사해서 고쳐요.\n복사할까요?')) copyBuiltin(); return; }
                setMode('edit');
              }} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><Pencil className="w-4 h-4" /> 판 고치기</button>}
              {board && <button onClick={() => setMode('hide')} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><EyeOff className="w-4 h-4" /> 칸 숨기기</button>}
              {board && <button onClick={doPrint} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><Printer className="w-4 h-4" /> 인쇄</button>}
              <button onClick={() => setShowVoice(true)} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><Volume2 className="w-4 h-4" /> 목소리</button>
              <div className="my-1 border-t border-stone-100" />
              <button onClick={addBoard} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><Plus className="w-4 h-4" /> 새 판</button>
              <button onClick={() => setShowImport(true)} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><Upload className="w-4 h-4" /> 칩판 넣기</button>
              <button onClick={() => setShowLibrary(true)} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2"><FolderOpen className="w-4 h-4" /> 자료실</button>
              {kidId !== 'all' && <button onClick={removeKid} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2 text-stone-500"><X className="w-4 h-4" /> 아이 빼기 ({kidName})</button>}
              {isAdmin && <div className="my-1 border-t border-stone-100" />}
              {isAdmin && <button onClick={() => setShowBuiltinUpload(true)} className="w-full px-3 py-2 rounded-lg hover:bg-stone-50 flex items-center gap-2" style={{ color: '#993556' }}><Shield className="w-4 h-4" /> 기본 판 올리기</button>}
            </div>
          </>)}
        </div>
      </div>

      {!board ? (
        <div className="rounded-2xl border-2 border-dashed border-stone-300 py-14 px-4 text-center space-y-3">
          <p className="text-stone-600 text-sm">아직 만든 판이 없어요.<br />'새 판'을 누르고 칸을 눌러 그림을 넣어 보세요.</p>
          <button onClick={addBoard} className="px-4 py-2 rounded-lg text-white text-sm font-bold" style={{ background: BOARD_PINK }}>새 판 만들기</button>
        </div>
      ) : (
        <>
          {/* 모드 줄 — 판 고치기·칸 숨기기 때만 */}
          {mode !== 'use' && <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-stone-100 rounded-lg p-0.5">
              {[['use', '수업', Volume2], ['edit', '판 고치기', Pencil], ['hide', '칸 숨기기', EyeOff]].map(([m, t, Icon]) => (
                <button key={m} onClick={() => {
                  if (m === 'edit' && board.builtin) {
                    if (safeConfirm('기본 판은 그대로 두고, 내 판으로 복사해서 고쳐요.\n복사할까요?')) copyBuiltin();
                    return;
                  }
                  setMode(m);
                }}
                  className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${mode === m ? 'bg-white shadow-sm font-bold text-stone-900' : 'text-stone-500'}`}>
                  <Icon className="w-4 h-4" /> {t}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <button onClick={() => setMode('use')} className="px-3 py-1.5 rounded-lg text-white text-sm font-bold flex items-center gap-1" style={{ background: BOARD_PINK }}><Check className="w-4 h-4" /> 다 했어요 (수업으로)</button>
          </div>}

          {mode === 'edit' && (
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-1.5">판 이름
                <input value={board.name} onChange={(e) => updateBoard(b => ({ ...b, name: e.target.value }))}
                  className="border border-stone-300 rounded-md px-2 py-1 w-36" />
              </label>
              <label className="flex items-center gap-1.5">묶음
                <select value={(board.group || '').trim()} onChange={(e) => {
                  let g = e.target.value;
                  if (g === '__new__') {
                    const n = safePrompt('새 묶음 이름을 적어 주세요 (예: 기분이 어떨 것 같아?)', '');
                    if (!n || !n.trim()) return;
                    g = n.trim();
                  }
                  updateBoard(b => ({ ...b, group: g }));
                }} className="border border-stone-300 rounded-md px-1.5 py-1 bg-white max-w-[11rem]">
                  <option value="">묶음 없음</option>
                  {myGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  <option value="__new__">+ 새 묶음</option>
                </select>
              </label>
              <label className="flex items-center gap-1.5">한 줄에
                <select value={board.cols || 4} onChange={(e) => updateBoard(b => ({ ...b, cols: parseInt(e.target.value, 10) }))}
                  className="border border-stone-300 rounded-md px-1.5 py-1 bg-white">
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}칸</option>)}
                </select>
              </label>
              <span className="flex items-center gap-1">칸 수 {board.cells.length}
                <button onClick={() => updateBoard(b => ({ ...b, cells: [...b.cells, { cardId: null, label: '' }] }))}
                  className="ml-1 w-7 h-7 rounded-md border border-stone-300 flex items-center justify-center" aria-label="칸 더하기"><Plus className="w-4 h-4" /></button>
                <button onClick={() => {
                  if (board.cells.length <= 1) return;
                  const last = board.cells[board.cells.length - 1];
                  if ((last.cardId || last.label) && !safeConfirm('마지막 칸을 지울까요?')) return;
                  updateBoard(b => ({ ...b, cells: b.cells.slice(0, -1) }));
                }} className="w-7 h-7 rounded-md border border-stone-300 flex items-center justify-center text-lg leading-none" aria-label="마지막 칸 빼기">−</button>
              </span>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={board.showLabel !== false} onChange={(e) => updateBoard(b => ({ ...b, showLabel: e.target.checked }))} />
                그림 밑 글자 보이기
              </label>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={sentenceOn} onChange={(e) => updateBoard(b => ({ ...b, sentence: e.target.checked }))} />
                낱말 이어 문장 만들기
              </label>
              <label className="flex items-center gap-1.5">말 빠르기
                <input type="range" min="0.5" max="1.3" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
                <span className="tabular-nums w-7">{rate.toFixed(1)}</span>
              </label>
              <button onClick={testSound} className="text-xs underline text-stone-600">소리 들어 보기</button>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={withChips} onChange={(e) => setWithChips(e.target.checked)} />
                인쇄할 때 오려 쓰는 칩도 함께
              </label>
              <div className="flex-1" />
              <button onClick={deleteBoard} className="text-red-600 flex items-center gap-1"><Trash2 className="w-4 h-4" /> 판 지우기</button>
            </div>
          )}

          {mode !== 'use' && <p className="text-xs text-stone-500">
            {mode === 'use' && (sentenceOn
              ? `낱말을 누르면 읽고 문장 줄에 쌓여요. 문장 줄을 누르면 문장 전체를 읽어요. 지금 ${kidName}에게 보이는 칸만 나와요.`
              : `그림을 누르면 소리로 읽어요. 지금 ${kidName}에게 보이는 칸만 나와요.`)}
            {mode === 'edit' && (isStory ? '위쪽 그림을 누르면 그림을 바꾸고, 아래 칸을 누르면 답 그림과 말을 바꿔요.' : '칸을 누르면 그림과 읽어 줄 말을 바꿔요.')}
            {mode === 'hide' && `칸을 누르면 ${kidName}에게 숨기거나 다시 보여요. 숨긴 칸은 자리만 남고 눌러도 소리가 나지 않아요.`}
          </p>}

          {renderStory(false)}
          {renderGrid(false)}
        </>
      )}

      {big && board && (
        <div className="fixed inset-0 z-50 bg-white p-3 sm:p-6 overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-stone-400 text-sm">{board.name}</span>
            <button onClick={() => setBig(false)} className="p-2 rounded-lg border border-stone-200 text-stone-500" aria-label="크게 보기 닫기"><X className="w-5 h-5" /></button>
          </div>
          <div className="max-w-5xl mx-auto space-y-3">{renderStory(true)}{renderGrid(true)}</div>
        </div>
      )}

      {pickIndex !== null && board && (
        <BoardCardPicker
          library={library}
          categories={categories}
          cell={{ ...board.cells[pickIndex], label: board.cells[pickIndex]?.label || cellView(board.cells[pickIndex], pickIndex).label }}
          onPick={(card, label) => setCell(pickIndex, { cardId: card.id, ref: null, label: label || card.label || '' })}
          onLabel={(label) => setCell(pickIndex, { label })}
          onClear={() => setCell(pickIndex, { cardId: null, ref: null, label: '' })}
          onClose={() => setPickIndex(null)}
        />
      )}

      {pickPage && board && page && (
        <BoardCardPicker
          library={library}
          categories={categories}
          cell={{ label: page.text || '' }}
          onPick={(card, label) => setPage({ cardId: card.id, videoPath: null, ...(label !== null && label !== undefined ? { text: label } : {}) })}
          onLabel={(label) => setPage({ text: label })}
          onClear={() => setPage({ cardId: null })}
          onClose={() => setPickPage(false)}
        />
      )}

      {showVoice && <VoiceModal rate={rate} setRate={setRate} onClose={() => setShowVoice(false)} />}
      {showLibrary && <LibraryModal isAdmin={isAdmin} onClose={() => setShowLibrary(false)} />}
      {renderPracticeSettings()}
      {showPicker && (() => {
        const AREAS = [
          { k: 'play', name: '🧸 놀이', groups: ['기본 놀이판 (틈새톡톡)', '놀이 AAC (톡톡 붙이고 조물조물)'] },
          { k: 'life', name: '🏠 생활', groups: ['상황별 포켓 AAC (틈새톡톡)', '오늘도 스스로 준비해요 (이어짐)', '생활 표지판', '끝말잇기'] },
          { k: 'body', name: '🩹 몸 · 아파요', groups: ['아파요 다쳤어요 (칩판)', '아파요 다쳤어요 (그림 보고 말하기)', '신체 부위 공부 (다원쌤)'] },
          { k: 'feel', name: '😊 기분 · 하는 말', groups: ['기분', '이럴 때 무슨 말 해야 돼?'] },
          { k: 'verb', name: '🏃 동사', groups: ['만 3세 고빈도 동사', '하고 있어요 · 다 했어요 (이어짐)', '내가 했어요 · 친구에게 해 줬어요 (이어짐)'] },
          { k: 'story', name: '📖 이야기', groups: ['이야기책', '반대말 동화', '사계절 동화'] },
          { k: 'think', name: '🧩 생각하기', groups: ['어디에 들어가?', '딱 맞는 짝을 찾아요', '빠진 부분 찾기', '어디에 있어?'] },
        ];
        const listed = builtins.filter(b => !b.unlisted);
        const known = new Set(AREAS.flatMap(a => a.groups));
        const etc = [...new Set(listed.map(b => b.group || '기본 판'))].filter(g => !known.has(g));
        const areas = [...(boards.length ? [{ k: 'mine', name: '⭐ 내 판', groups: null }] : []), ...AREAS, ...(etc.length ? [{ k: 'etc', name: '그 밖의 판', groups: etc }] : [])];
        const areaOf = (b) => (b && !b.builtin ? 'mine' : (areas.find(a => a.groups && a.groups.includes(b?.group || '기본 판'))?.k || 'etc'));
        const curArea = pickArea || (board ? areaOf(board) : areas[0]?.k);
        const q = pickQ.trim();
        const close = () => setShowPicker(false);
        const choose = (id) => { setActiveId(id); setMode('use'); close(); };
        const Card = ({ b }) => {
          const th = b.thumb || (b.builtin ? '' : (b.cells || []).map((c, i) => (c.cardId ? cardMap[c.cardId]?.image : c.image)).find(Boolean));
          return (
            <button onClick={() => choose(b.id)} className="flex items-center gap-2 rounded-xl border-2 bg-white p-1.5 text-left min-w-0"
              style={b.id === activeId ? { borderColor: BOARD_PINK, background: '#FDEEF2' } : { borderColor: '#E7E1E3' }}>
              {th ? <img src={th} alt="" className="w-11 h-11 rounded-lg object-contain bg-white border border-stone-200 flex-none" draggable={false} />
                : <span className="w-11 h-11 rounded-lg flex items-center justify-center flex-none border border-stone-200" style={{ background: '#FDEEF2', color: BOARD_PINK }}><FolderOpen className="w-5 h-5" /></span>}
              <span className="min-w-0">
                <span className="block text-sm font-bold text-stone-800 leading-snug break-words">{b.name}</span>
                {(b.ans || b.vid) && <span className="flex gap-1 mt-0.5 flex-wrap">
                  {b.ans && <span className="text-[11px] font-bold rounded-full px-1.5" style={{ background: '#E6F6EC', color: '#2E9E5B' }}>정답 연습</span>}
                  {b.vid && <span className="text-[11px] font-bold rounded-full px-1.5" style={{ background: '#E8F0FB', color: '#3D6FB6' }}>영상</span>}
                </span>}
              </span>
            </button>
          );
        };
        const grid = (list) => <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>{list.map(b => <Card key={b.id} b={b} />)}</div>;
        let body;
        if (q) {
          const hits = [...boards, ...listed].filter(b => (b.name || '').includes(q) || (b.group || '').includes(q));
          body = hits.length ? (<><h4 className="text-xs font-bold text-stone-500 mt-3 mb-1.5">‘{q}’ 찾은 판 {hits.length}개</h4>{grid(hits)}</>) : <p className="text-sm text-stone-400 py-6 text-center">‘{q}’이(가) 들어간 판이 없어요.</p>;
        } else {
          const a = areas.find(x => x.k === curArea) || areas[0];
          body = (<>
            {curKid && (<>
              <h4 className="text-xs font-bold mt-3 mb-1.5" style={{ color: '#9A6B00' }}>⭐ {curKid.name} 자주 쓰는 판</h4>
              {favBoards.length ? grid(favBoards) : <p className="text-sm text-stone-400">아직 없어요. 판을 열고 ☰ 메뉴에서 ☆을 눌러 넣어요.</p>}
            </>)}
            <div className="flex gap-1.5 overflow-x-auto py-2.5 mt-1">
              {areas.map(x => (
                <button key={x.k} onClick={() => setPickArea(x.k)} aria-pressed={x.k === a?.k}
                  ref={(el) => { if (el && x.k === a?.k) { try { const bx = el.parentNode; bx.scrollLeft = Math.max(0, el.offsetLeft - bx.offsetLeft - bx.clientWidth / 2 + el.offsetWidth / 2); } catch {} } }}
                  className="flex-none rounded-full border-2 px-3 py-1 text-sm font-bold whitespace-nowrap"
                  style={x.k === a?.k ? { borderColor: BOARD_PINK, background: '#FDEEF2', color: '#2B2326' } : { borderColor: '#E7E1E3', background: '#fff', color: '#5B5054' }}>{x.name}</button>
              ))}
            </div>
            {a && a.k === 'mine' && (<>
              {boards.some(b => !(b.group || '').trim()) && (<><h4 className="text-xs font-bold text-stone-500 mt-2 mb-1.5">내 판</h4>{grid(boards.filter(b => !(b.group || '').trim()))}</>)}
              {myGroups.map(g => <div key={g}><h4 className="text-xs font-bold text-stone-500 mt-3 mb-1.5">{g}</h4>{grid(boards.filter(b => (b.group || '').trim() === g))}</div>)}
            </>)}
            {a && a.groups && a.groups.map(g => { const bs = listed.filter(b => (b.group || '기본 판') === g); return bs.length ? <div key={g}><h4 className="text-xs font-bold text-stone-500 mt-3 mb-1.5">{g} · {bs.length}</h4>{grid(bs)}</div> : null; })}
          </>);
        }
        return (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={close}>
            <div className="bg-white w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl shadow-xl h-[88vh] sm:h-auto sm:max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="판 고르기">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-100">
                <b className="text-lg text-stone-900">판 고르기</b>
                <button onClick={close} className="ml-auto p-1 text-stone-400" aria-label="닫기"><X className="w-5 h-5" /></button>
              </div>
              <div className="overflow-auto px-4 pb-5 pt-3">
                <input value={pickQ} onChange={(e) => setPickQ(e.target.value)} type="search" placeholder="판 이름으로 찾기 (예: 아파, 동화, 동사)" aria-label="판 이름으로 찾기"
                  className="w-full border-2 border-stone-200 rounded-xl px-3 py-2 text-sm bg-stone-50 focus:outline-none focus:border-pink-300" />
                {body}
              </div>
            </div>
          </div>
        );
      })()}
      {showBuiltinUpload && (
        <BuiltinUploadModal count={builtins.filter(b => !b.unlisted).length} onClose={() => setShowBuiltinUpload(false)}
          onDone={() => { setShowBuiltinUpload(false); reloadBuiltins(); }} />
      )}

      {showNew && (
        <NewBoardModal library={library} categories={categories} setCategories={setCategories} setLibrary={setLibrary} groupNames={myGroups}
          onCreate={createBoards} onClose={() => setShowNew(false)} />
      )}

      {showImport && (
        <ChipImportModal
          categories={categories}
          setCategories={setCategories}
          setLibrary={setLibrary}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  // ───── 인증 상태 ─────
  const [currentUser, setCurrentUser] = useState(null); // null이면 로그인 안 됨
  const [users, setUsers] = useState([]); // Edge Function에서 동적으로 로드
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // 초기 세션 체크 완료 여부

  // 앱 시작 시 Auth 세션 복원 (sb-auth-session → getCurrentAuthUser)
  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        const authUser = await getCurrentAuthUser();
        if (authUser?.id && !cancelled) {
          const isAdmin = await checkIsAdmin();
          if (!cancelled) {
            setCurrentUser({
              id: authUser.id,
              email: authUser.email,
              role: isAdmin ? 'admin' : 'teacher',
              name: authUser.user_metadata?.display_name || authUser.email?.split('@')[0] || authUser.email,
            });
          }
        }
      } catch (e) {
        devWarn('세션 복원 실패:', e);
      }
      if (!cancelled) setAuthChecked(true);
    };

    loadInitialData();
    return () => { cancelled = true; };
  }, []);

  const handleLogin = (user) => {
    // Auth 세션은 signInWithPassword에서 이미 sessionStorage에 저장됨.
    // 여기선 앱 상태(currentUser)만 세팅.
    setCurrentUser(user);
  };

  const handleLogout = () => {
    // 로그아웃 전: 현재 작업 중인 카드를 마지막으로 저장 (디바운싱 우회)
    if (currentUser && cards.length > 0 && draftKey) {
      try {
        const draft = { cards, sizeMm, labelPos, fontId, labelSize, savedAt: Date.now() };
        localStorage.setItem(draftKey, JSON.stringify(draft));
      } catch {}
    }
    setCards([]);
    setCurrentUser(null);
    setShowUserManagement(false);
    signOutAuth(); // Auth 세션 정리 (sb-auth-session 제거 + 서버 logout)
  };

  // ───── 기존 AAC maker 상태 ─────
  const [cards, setCards] = useState([]);
  const [sizeMm, setSizeMm] = useState(45);
  const [labelPos, setLabelPos] = useState('bottom');
  const [fontId, setFontId] = useState('round');
  const [labelSize, setLabelSize] = useState(14);
  const [gap, setGap] = useState(3);
  const [showCutLines, setShowCutLines] = useState(true);
  const [cutLineWidth, setCutLineWidth] = useState(1); // 자르는 선 굵기 (px)
  const [cutLineStyle, setCutLineStyle] = useState('dashed'); // 'solid' | 'dashed' | 'dotted'
  const cutLineColor = '#1c1917'; // 검정 고정
  // 인쇄 옵션 확장
  const [cardRadius, setCardRadius] = useState(0); // 카드 모서리 둥글기 (mm)
  const [safetyMargin, setSafetyMargin] = useState(0); // 코팅 여백 (mm)
  const [doubleSided, setDoubleSided] = useState(false); // 양면 인쇄
  const [backDesign, setBackDesign] = useState('label'); // 'label' | 'logo' | 'solid' | 'pattern'
  const [backColor, setBackColor] = useState('#fef3c7'); // 뒷면 단색 (amber-100)
  const [view, setView] = useState('edit'); // 'edit' | 'preview'
  // 인쇄 미리보기 진입 시 폰트 로딩 상태 - Google Fonts는 비동기로 로딩되므로 명시적으로 대기
  // false 동안 안내 박스에 "폰트 로딩 중" 표시 + 인쇄 직전에도 한 번 더 대기
  const [fontsReady, setFontsReady] = useState(false);
  // 이미지 추가 처리 중 표시 - 사용자가 여러 장 선택했을 때 "버튼 안 눌리나?" 오해 방지
  // null: 처리 중 아님, { current, total }: 진행률
  const [imageProcessing, setImageProcessing] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState([]); // 인쇄한 카드 묶음 보관
  const [showHistory, setShowHistory] = useState(false); // 히스토리 패널 펼치기
  const [historySearch, setHistorySearch] = useState(''); // 히스토리 검색어

  // 카테고리 (전역 - 모든 카드가 공유)
  const [categories, setCategories] = useState([]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false); // 사이드바 카테고리 펼침 여부 (기본 접힘)
  const [settingsOpen, setSettingsOpen] = useState(false); // 사이드바 설정 펼침 여부 (기본 접힘)
  const [showBundleLoader, setShowBundleLoader] = useState(false); // 묶음 불러오기 모달
  const [bundleLoaderTab, setBundleLoaderTab] = useState('saved'); // 'saved' | 'file'
  const [expandedOwners, setExpandedOwners] = useState({}); // {ownerUsername: bool} - 선생님 폴더 펼침 여부

  // 카테고리 필터 (편집 화면에서만 - 보여줄 카드 필터링)
  const [filterCategoryId, setFilterCategoryId] = useState(null); // null이면 전체
  const [cardSearch, setCardSearch] = useState(''); // 카드 검색어 (라벨로)
  const [sortMode, setSortMode] = useState('default'); // 'default' | 'label' | 'category' | 'shortest' | 'longest'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // 모바일 사이드바 토글
  const [editingImageCard, setEditingImageCard] = useState(null); // 이미지 편집 중인 카드
  const [settingsTab, setSettingsTab] = useState('card'); // 'card' | 'print' - 사이드바 탭

  // 일괄 라벨 편집 모달
  const [showBulkEditor, setShowBulkEditor] = useState(false);

  // ───── 라이브러리(영구 보관) 상태 ─────
  const [viewMode, setViewMode] = useState('print'); // 'print'(인쇄판) | 'library'(라이브러리)
  const [library, setLibrary] = useState({}); // { [categoryId or '__none__']: cards[] }
  const libraryLoadedRef = useRef(false); // 로드 완료 전 저장 금지 (덮어쓰기 방지)
  const [libraryCatId, setLibraryCatId] = useState(null); // 라이브러리에서 보고 있는 카테고리 (null=미분류)
  const [librarySelected, setLibrarySelected] = useState(() => new Set()); // 체크된 카드 id
  const [librarySearch, setLibrarySearch] = useState(''); // 카테고리 화면 전용 검색어 (인쇄판과 분리)
  const [diagResult, setDiagResult] = useState(null); // 진단 결과 (화면 표시용)

  // 튜토리얼
  const [showTutorial, setShowTutorial] = useState(false);

  // 드래그 정렬 상태
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const fileInputRef = useRef(null);
  const libraryImageInputRef = useRef(null); // 카테고리 화면 전용 이미지 추가 인풋

  // 자동 저장 quota 초과 알림 - 세션당 1회만 (디바운스마다 토스트 띄우면 짜증남)
  const draftQuotaWarnedRef = useRef(false);

  const font = FONT_OPTIONS.find(f => f.id === fontId) || FONT_OPTIONS[0];

  // 앱 시작 시 히스토리 인덱스 + 카테고리 불러오기
  // 인덱스만 먼저 로드 (썸네일 포함, 카드 본문은 사용 시점에 로드)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const indexed = await loadHistoryIndex(currentUser);
        if (!cancelled && Array.isArray(indexed)) setHistory(indexed);
      } catch (e) {
        devWarn('히스토리 인덱스 불러오기 실패:', e);
      }
      try {
        // 카테고리: 본인 aac_data 에 저장 (RLS로 본인 것만)
        const row = await dataGet(CATEGORIES_KEY);
        if (!cancelled && row?.value) {
          const parsed = JSON.parse(row.value);
          if (Array.isArray(parsed)) setCategories(parsed);
        }
      } catch {}
      // 로드가 끝난 뒤에만 저장을 허용 (로드 전 빈 배열이 저장돼 덮어쓰는 문제 방지)
      if (!cancelled) categoriesLoadedRef.current = true;
    })();
    return () => { cancelled = true; categoriesLoadedRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // 카테고리 변경 시 본인 aac_data 에 저장
  const categoriesSaveTimerRef = useRef(null);
  const categoriesLoadedRef = useRef(false); // 로드 완료 전에는 저장 금지 (빈 배열 덮어쓰기 방지)
  useEffect(() => {
    if (!authChecked || !currentUser) return;
    if (!categoriesLoadedRef.current) return; // 아직 로드 안 끝났으면 저장 스킵
    if (categoriesSaveTimerRef.current) clearTimeout(categoriesSaveTimerRef.current);
    categoriesSaveTimerRef.current = setTimeout(() => {
      dataSet(CATEGORIES_KEY, JSON.stringify(categories)).catch(e => devWarn('카테고리 저장 실패:', e));
    }, 800);
    return () => {
      if (categoriesSaveTimerRef.current) clearTimeout(categoriesSaveTimerRef.current);
    };
  }, [categories, authChecked, currentUser]);

  // ───── 라이브러리 로드 (로그인 후 1회) ─────
  useEffect(() => {
    if (!currentUser || !authChecked) return;
    let cancelled = false;
    libraryLoadedRef.current = false;
    (async () => {
      // 마이그레이션 완료로 base64가 빠져 행이 가벼우므로, key,value를 배치로 읽음(빠름).
      // 토큰 준비 전 첫 시도가 실패할 수 있으므로 카드를 받을 때까지 재시도.
      for (let attempt = 0; attempt < 8; attempt++) {
        if (cancelled) return;
        try {
          const listRes = await dataList(LIBCARD_PREFIX); // key,value 배치 조회
          if (cancelled) return;
          const rows = listRes.rows || [];
          if (rows.length > 0) {
            const map = {};
            const needSign = []; // imagePath 방식 카드 (서명 URL 채울 대상)
            for (const r of rows) {
              let c = null;
              try { c = JSON.parse(r.value); } catch { c = null; }
              if (!c) continue;
              // 신규(경로) 또는 구버전(base64) 둘 다 수용
              if (c.imagePath || c.image) {
                const k = c.categoryId || '__none__';
                if (!map[k]) map[k] = [];
                map[k].push(c);
                if (c.imagePath) needSign.push(c);
              }
            }
            // 경로 방식 카드: 서명 URL 일괄 발급 후 image/originalImage 채움
            if (needSign.length) {
              const paths = [];
              for (const c of needSign) {
                if (c.imagePath) paths.push(c.imagePath);
                if (c.originalPath) paths.push(c.originalPath);
              }
              const urls = await resolveSignedUrls(paths);
              if (cancelled) return;
              for (const c of needSign) {
                c.image = (c.imagePath && urls[c.imagePath]) || '';
                c.originalImage = (c.originalPath && urls[c.originalPath]) || null;
              }
            }
            setLibrary(map);
            break; // 성공
          }
          // 0개 + 에러 아님 = 진짜 카드 없음 (몇 번 확인 후 종료)
          if (!listRes._error && attempt >= 2) {
            setLibrary({});
            break;
          }
        } catch (e) {
          devWarn('라이브러리 로드 재시도:', e);
        }
        await new Promise(res => setTimeout(res, 600 * (attempt + 1)));
      }
      if (!cancelled) libraryLoadedRef.current = true;
    })();
    return () => { cancelled = true; libraryLoadedRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, authChecked]);
  useEffect(() => {
    if (filterCategoryId) setCategoryOpen(true);
  }, [filterCategoryId]);

  // ───── 작업 중 카드 자동 저장 (drafts) ─────
  // 사용자별로 localStorage에만 저장 (브라우저별 분리, 새로고침 시 복구)
  const draftKey = currentUser ? `${DRAFT_KEY_PREFIX}${currentUser.email}` : null;

  // 로그인 후 한 번: 작업 중이던 카드 복구
  useEffect(() => {
    if (!currentUser || !authChecked) return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed?.cards) && parsed.cards.length > 0) {
          setCards(parsed.cards);
          // 작업 중이던 설정도 복구 (있으면)
          if (parsed.sizeMm) setSizeMm(parsed.sizeMm);
          if (parsed.labelPos) setLabelPos(parsed.labelPos);
          if (parsed.fontId) setFontId(parsed.fontId);
          if (typeof parsed.labelSize === 'number') setLabelSize(parsed.labelSize);
          devLog(`✅ 작업 중이던 카드 ${parsed.cards.length}장 복구됨`);
        }
      }
    } catch (e) {
      devWarn('초안 복구 실패:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email, authChecked]); // 로그인 변경 시에만

  // 작업 중인 카드 자동 저장 - 디바운싱으로 부담 최소화
  // 주의: 카드 0장이어도 자동으로 draft를 지우진 않음 (로그아웃 시 race 방지)
  // draft 삭제는 명시적인 사용자 액션(clearAll, loadFromHistory 등)에서만 처리
  useEffect(() => {
    if (!authChecked || !currentUser || !draftKey) return;
    // 카드 0장이면 저장 안 하지만 기존 draft는 유지 (다른 곳에서 명시적으로 삭제)
    if (cards.length === 0) return;
    // 디바운싱: 2.5초간 변화 없으면 저장
    // (카드가 많으면 stringify 비용이 큼 - 너무 자주 저장하면 입력 끊김 느낌)
    const timer = setTimeout(() => {
      const draft = { cards, sizeMm, labelPos, fontId, labelSize, savedAt: Date.now() };
      const json = JSON.stringify(draft);
      try {
        localStorage.setItem(draftKey, json);
        // 저장 성공: 이전에 경고 띄웠다면 리셋 (용량 확보됐다는 뜻)
        if (draftQuotaWarnedRef.current) draftQuotaWarnedRef.current = false;
      } catch (e) {
        // 1차 실패: 다른 사용자의 오래된 draft 정리 후 재시도
        devWarn('자동 저장 실패 - 다른 사용자 draft 정리 후 재시도:', e);
        const cleaned = cleanupOldDrafts(currentUser.email);
        try {
          localStorage.setItem(draftKey, json);
          if (cleaned > 0) {
            devInfo(`다른 사용자 draft ${cleaned}개 정리 후 저장 성공`);
          }
          if (draftQuotaWarnedRef.current) draftQuotaWarnedRef.current = false;
        } catch (e2) {
          // 정리해도 실패: 본인 카드 데이터 자체가 너무 큼 - 사용자에게 백업 권유
          devWarn('자동 저장 재시도도 실패:', e2);
          if (!draftQuotaWarnedRef.current) {
            draftQuotaWarnedRef.current = true;
            safeAlert('⚠️ 자동 저장 실패\n브라우저 저장 공간이 부족합니다.\n사이드바 "현재 카드 내보내기"로 .json 파일 백업을 권장합니다.');
          }
        }
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [cards, sizeMm, labelPos, fontId, labelSize, authChecked, currentUser, draftKey]);

  // 인쇄 미리보기 진입 시 폰트 로딩 명시 트리거
  // Google Fonts @import만으론 즉시 로드 안 됨 - 인쇄 시점에 fallback 폰트로 나갈 위험
  // document.fonts.load()로 실제 사용 폰트만 우선 로드 후 ready 보장
  useEffect(() => {
    if (view !== 'preview') {
      setFontsReady(false);
      return;
    }
    let cancelled = false;
    const loadFonts = async () => {
      try {
        if (typeof document === 'undefined' || !document.fonts) {
          // 구형 브라우저 등 Font Loading API 미지원 - 그냥 ready 처리 (fallback 폰트로 인쇄됨)
          if (!cancelled) setFontsReady(true);
          return;
        }
        // 실제 사용하는 폰트만 명시 로드 (모든 weight 다 받지 않음 - 트래픽 절약)
        await Promise.all([
          document.fonts.load('700 16px "Jua"'),
          document.fonts.load('600 16px "Noto Sans KR"'),
          document.fonts.load('700 16px "Noto Sans KR"'),
          document.fonts.load('400 16px "Noto Serif KR"'),
          document.fonts.load('600 16px "Noto Serif KR"'),
        ]);
        // 다른 폰트도 로딩 중일 수 있으니 전체 ready 한 번 더 대기
        await document.fonts.ready;
        if (!cancelled) setFontsReady(true);
      } catch (e) {
        // 로딩 실패해도 인쇄 차단하지 않음 (fallback 폰트로라도 출력 가능)
        devWarn('폰트 로딩 실패 (fallback 폰트로 인쇄됨):', e);
        if (!cancelled) setFontsReady(true);
      }
    };
    loadFonts();
    return () => { cancelled = true; };
  }, [view]);

  // 전역 Esc 키 핸들러 - 열려있는 모달을 위에서부터 하나씩 닫음
  // 사용자 가장 빈번한 답답함(매번 X 버튼 찾기) 해소
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // 한국어 IME 조합 중에는 IME 취소가 우선
      if (e.isComposing) return;
      // 우선순위: 가장 안쪽/최근 열린 것부터 닫음
      if (editingImageCard) { setEditingImageCard(null); e.preventDefault(); return; }
      if (showBulkEditor) { setShowBulkEditor(false); e.preventDefault(); return; }
      if (showCategoryManager) { setShowCategoryManager(false); e.preventDefault(); return; }
      if (showBundleLoader) { setShowBundleLoader(false); e.preventDefault(); return; }
      if (showUserManagement) { setShowUserManagement(false); e.preventDefault(); return; }
      if (showTutorial) { setShowTutorial(false); e.preventDefault(); return; }
      if (mobileSidebarOpen) { setMobileSidebarOpen(false); e.preventDefault(); return; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingImageCard, showBulkEditor, showCategoryManager, showBundleLoader, showUserManagement, showTutorial, mobileSidebarOpen]);

  // 사용자별 튜토리얼 1회 표시 (개인 - 브라우저별)
  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    let timerId = null;
    try {
      const key = `aac_tutorial_seen_${currentUser.email}`;
      const seen = localStorage.getItem(key);
      if (!seen) {
        timerId = setTimeout(() => {
          if (!cancelled) setShowTutorial(true);
        }, 800);
      }
    } catch {}
    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email]); // username만 의존 - 객체 참조 변경 무시

  const closeTutorial = () => {
    setShowTutorial(false);
    if (currentUser) {
      try {
        localStorage.setItem(`aac_tutorial_seen_${currentUser.email}`, '1');
      } catch {}
    }
  };

  // 다른 세션의 변경사항을 가져와서 화면에 반영 (수동 새로고침용)
  const refreshHistory = async () => {
    try {
      const indexed = await loadHistoryIndex(currentUser);
      if (Array.isArray(indexed)) setHistory(indexed);
    } catch (e) {
      devWarn('히스토리 새로고침 실패:', e);
    }
  };

  // 이미지 추가 (여러 장 한꺼번에)
  const handleFiles = useCallback(async (files) => {
    // ─── 사전 검증 정책 ───
    const ALLOWED_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB (폰 카메라 사진 충분히 수용)

    const rawArr = Array.from(files);
    const fileArr = [];
    const preFiltered = []; // 사전 검증 실패 { name, reason }

    for (const f of rawArr) {
      // 1) 형식 검증 (MIME + 확장자 이중 체크 - SVG/HEIC 등 차단)
      const ext = (f.name.split('.').pop() || '').toLowerCase();
      const validExt = ALLOWED_EXT.includes(ext);
      const validMime = ALLOWED_MIME.includes((f.type || '').toLowerCase());
      if (!validMime || !validExt) {
        preFiltered.push({ name: f.name, reason: '지원하지 않는 형식' });
        continue;
      }
      // 2) 빈 파일 거부
      if (f.size === 0) {
        preFiltered.push({ name: f.name, reason: '빈 파일' });
        continue;
      }
      // 3) 크기 상한
      if (f.size > MAX_FILE_SIZE) {
        preFiltered.push({ name: f.name, reason: '20MB 초과' });
        continue;
      }
      fileArr.push(f);
    }

    if (fileArr.length === 0 && preFiltered.length === 0) {
      safeAlert('이미지 파일이 없습니다.\nJPG, PNG, WebP, GIF 형식만 가능합니다.');
      return;
    }

    // 처리 중 표시 시작 (사용자에게 "진행 중" 시각 피드백)
    if (fileArr.length > 0) {
      setImageProcessing({ current: 0, total: fileArr.length });
    }

    const newCards = [];
    const failed = []; // 처리 중 실패 { name, reason }
    try {
      for (const file of fileArr) {
        try {
          // FileReader 단계도 에러 처리 (예: 권한 없는 파일, 손상된 파일)
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            const readTimer = setTimeout(() => reject(new Error('파일 읽기 시간 초과')), 15000);
            reader.onload = (e) => {
              clearTimeout(readTimer);
              resolve(e.target.result);
            };
            reader.onerror = () => {
              clearTimeout(readTimer);
              reject(new Error('파일을 읽을 수 없습니다'));
            };
            reader.onabort = () => {
              clearTimeout(readTimer);
              reject(new Error('파일 읽기가 중단되었습니다'));
            };
            reader.readAsDataURL(file);
          });
          // 원본도 적당히 축소 (편집용, 800px면 충분)
          const compressedOriginal = await downscaleImage(dataUrl, 800, 0.85);
          // 카드 표시용은 400px (인쇄 50mm = 약 472px이므로 충분)
          const cropped = await cropToSquare(compressedOriginal, 400);
          // 라벨은 항상 비워둠 (사용자가 직접 입력)
          // 자동 추출은 부정확한 경우가 많아서 제거함
          const autoLabel = '';
          newCards.push({
            id: newId(),
            image: cropped,
            originalImage: compressedOriginal, // 압축된 원본 (편집용)
            label: autoLabel,
            categoryId: filterCategoryId || null, // 특정 카테고리 보고 있을 때 추가하면 그 카테고리로
          });
        } catch (err) {
          failed.push({ name: file.name, reason: err?.message || '알 수 없는 오류' });
        }
        // 진행률 업데이트 (성공/실패 무관 - 한 파일 처리 완료)
        setImageProcessing(prev => prev ? { ...prev, current: prev.current + 1 } : null);
      }
    } finally {
      // 무슨 일이 있어도 처리 중 표시 제거 (예외 발생해도 끝나는 보장)
      setImageProcessing(null);
    }
    if (newCards.length > 0) {
      if (viewMode === 'library') {
        // 라이브러리 모드: 지금 보고 있는 카테고리에 카드 단위로 저장 (성공분만 화면 반영)
        const NONE = '__none__';
        const key = libraryCatId || NONE;
        const tagged = newCards.map(c => ({ ...c, categoryId: libraryCatId || null }));
        const { failCount, saved } = await saveLibraryCards(tagged);
        if (saved.length > 0) {
          setLibrary(prev => ({ ...prev, [key]: [...(prev[key] || []), ...saved] }));
        }
        if (failCount > 0) {
          safeAlert(`${failCount}장이 저장되지 않았습니다.\n이미지 용량이 클 수 있어요. 다시 시도하거나 더 적게 나눠서 추가해보세요.`);
        }
      } else {
        setCards(prev => [...prev, ...newCards]);
      }
    }
    // 결과 피드백: 사전검증 실패 + 처리 중 실패를 사유별로 그룹화
    const allFailed = [...preFiltered, ...failed];
    if (allFailed.length > 0) {
      const grouped = {};
      for (const f of allFailed) {
        if (!grouped[f.reason]) grouped[f.reason] = 0;
        grouped[f.reason]++;
      }
      const lines = Object.entries(grouped).map(([reason, cnt]) => `· ${reason} (${cnt}장)`);
      if (newCards.length > 0) {
        safeAlert(`${newCards.length}장 추가됨\n실패 ${allFailed.length}장:\n${lines.join('\n')}`);
      } else {
        safeAlert(`이미지를 추가할 수 없습니다.\n${lines.join('\n')}`);
      }
    }
  }, [filterCategoryId, viewMode, libraryCatId]);

  const onFileChange = (e) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  // 라이브러리에서 선택한 카드들을 인쇄판(cards)에 복사해 담기 (원본은 보존)
  // 라이브러리에 카드 추가 (특정 카테고리로) + Supabase 저장 (카드 단위)
  // newCards: [{ image, originalImage?, label? }]  categoryId: null이면 미분류
  const addCardsToLibrary = useCallback(async (newCards, categoryId) => {
    const NONE = '__none__';
    const key = categoryId || NONE;
    const prepared = (newCards || []).map(c => ({
      id: c.id || newId(),
      image: c.image,
      originalImage: c.originalImage || null,
      label: c.label || '',
      categoryId: categoryId || null,
    }));
    if (prepared.length === 0) return { okCount: 0, failCount: 0 };
    // 저장 성공한 카드만 화면에 반영 (저장 안 된 게 보이는 착각 방지)
    const { okCount, failCount, saved } = await saveLibraryCards(prepared);
    if (saved.length > 0) {
      setLibrary(prev => ({ ...prev, [key]: [...(prev[key] || []), ...saved] }));
    }
    return { okCount, failCount };
  }, []);

  // 카테고리 탭 진입 시: 카드가 들어있는 첫 카테고리를 우선 선택 (없으면 첫 카테고리)
  useEffect(() => {
    if (viewMode !== 'library' || libraryCatId !== null) return;
    if (categories.length === 0) return;
    // 카드가 실제로 있는 카테고리를 먼저 찾음
    const withCards = categories.find(c => (library[c.id] || []).length > 0);
    if (withCards) {
      setLibraryCatId(withCards.id);
    } else if ((library['__none__'] || []).length > 0) {
      // 미분류에 카드가 있으면 미분류(null) 유지 — 이미 null이므로 setState 불필요
    } else {
      setLibraryCatId(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, categories, library]);
  const handleCategoriesUpdate = useCallback((nextCategories) => {
    const nextIds = new Set((nextCategories || []).map(c => c.id));
    const removedIds = categories.map(c => c.id).filter(id => !nextIds.has(id));
    setCategories(nextCategories);
    if (removedIds.length > 0) {
      removedIds.forEach(catId => {
        const cardsInCat = library[catId] || [];
        deleteLibraryCategoryCards(cardsInCat).catch(e => devWarn('카테고리 카드 정리 실패:', e));
        setLibrary(prev => {
          const next = { ...prev };
          delete next[catId];
          return next;
        });
      });
      if (removedIds.includes(libraryCatId)) setLibraryCatId(null);
    }
  }, [categories, library, libraryCatId]);

  const addSelectedToPrint = useCallback(() => {
    const picked = [];
    Object.values(library).forEach(arr => {
      (arr || []).forEach(c => {
        if (librarySelected.has(c.id)) {
          picked.push({
            id: newId(),
            image: c.image,
            originalImage: c.originalImage || null,
            label: c.label || '',
            categoryId: c.categoryId || null,
          });
        }
      });
    });
    if (picked.length === 0) return;
    setCards(prev => [...prev, ...picked]);
    setLibrarySelected(new Set());
    setViewMode('print');
    safeAlert(`${picked.length}장을 인쇄판에 담았습니다.`);
  }, [library, librarySelected]);

  // 라이브러리 카드 한 장 삭제 (DB + 화면 + 선택목록)
  const deleteLibraryCardById = useCallback(async (cardId) => {
    if (!safeConfirm('이 카드를 카테고리에서 삭제할까요?')) return;
    await deleteLibraryCard(cardId).catch(e => devWarn('카드 삭제 실패:', e));
    setLibrary(prev => {
      const next = {};
      for (const [k, arr] of Object.entries(prev)) {
        next[k] = (arr || []).filter(c => c.id !== cardId);
      }
      return next;
    });
    setLibrarySelected(prev => {
      if (!prev.has(cardId)) return prev;
      const n = new Set(prev); n.delete(cardId); return n;
    });
  }, []);

  // 선택한 카드 여러 장 한꺼번에 삭제
  // 진단: DB에 실제 저장된 라이브러리 카드 수를 조회해 알려줌
  const diagnoseLibrary = useCallback(async () => {
    setDiagResult('진단 중...');
    try {
      // 1) DB에서 카드 조회
      const res = await dataList(LIBCARD_PREFIX);
      const dbCount = (res.rows || []).length;
      const err = res._error ? ' ⚠️로드오류' : '';
      const byCat = {};
      for (const r of (res.rows || [])) {
        try {
          const c = JSON.parse(r.value);
          const k = c.categoryId || '미분류';
          byCat[k] = (byCat[k] || 0) + 1;
        } catch {}
      }
      const screenCount = Object.values(library).reduce((s, a) => s + (a?.length || 0), 0);

      // 첫 행의 실제 구조 확인 (parse 되는지)
      let sample = '없음';
      if ((res.rows || []).length > 0) {
        const first = res.rows[0];
        const vtype = typeof first.value;
        let parsed = null, perr = '';
        try { parsed = JSON.parse(first.value); } catch (e) { perr = 'parse실패:' + e.message; }
        if (parsed) {
          sample = `key=${first.key} | 필드=[${Object.keys(parsed).join(',')}] | categoryId=${parsed.categoryId} | image길이=${(parsed.image||'').length}`;
        } else {
          sample = `key=${first.key} | value타입=${vtype} | ${perr} | 앞부분=${String(first.value).slice(0,50)}`;
        }
      }

      // 2) 저장 테스트: 작은 테스트 카드 하나 저장 시도
      let saveTest = '?';
      try {
        const testCard = { id: 'diagtest_' + Date.now(), image: 'data:image/png;base64,test', label: '진단테스트', categoryId: null };
        const ok = await saveLibraryCard(testCard);
        saveTest = ok ? '성공' : '실패';
        if (ok) await deleteLibraryCard(testCard.id); // 테스트 카드 삭제
      } catch (e) { saveTest = '에러:' + (e?.message || e); }

      const catList = categories.map(c => `${c.name}: ${byCat[c.id] || 0}`).join(', ');
      setDiagResult(
        `DB저장 카드수: ${dbCount}${err} | 화면: ${screenCount} | 저장테스트: ${saveTest}\n` +
        `첫카드: ${sample}\n` +
        `카테고리별: ${catList} | 미분류: ${byCat['미분류'] || 0}`
      );
    } catch (e) {
      setDiagResult('진단 실패: ' + (e?.message || String(e)));
    }
  }, [categories, library]);

  const deleteSelectedLibraryCards = useCallback(async () => {
    const ids = Array.from(librarySelected);
    if (ids.length === 0) return;
    if (!safeConfirm(`선택한 ${ids.length}장을 삭제할까요?`)) return;
    const idSet = new Set(ids);
    await Promise.all(ids.map(id => deleteLibraryCard(id).catch(e => devWarn('카드 삭제 실패:', e))));
    setLibrary(prev => {
      const next = {};
      for (const [k, arr] of Object.entries(prev)) {
        next[k] = (arr || []).filter(c => !idSet.has(c.id));
      }
      return next;
    });
    setLibrarySelected(new Set());
  }, [librarySelected]);

  // 선택한 카드들을 다른 카테고리로 이동 (categoryId 변경 후 재저장)
  const moveSelectedLibraryCards = useCallback(async (targetCategoryId) => {
    const ids = Array.from(librarySelected);
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    const NONE = '__none__';
    const destKey = targetCategoryId || NONE;

    // 1) 현재 library에서 대상 카드들을 먼저 뽑아 categoryId 교체 (setState 콜백에 의존하지 않음)
    const moving = [];
    for (const arr of Object.values(library)) {
      for (const c of (arr || [])) {
        if (idSet.has(c.id)) moving.push({ ...c, categoryId: targetCategoryId || null });
      }
    }
    if (moving.length === 0) return;

    // 2) DB 재저장 (imagePath가 그대로라 재업로드 없이 categoryId만 갱신). 성공분만 화면 반영.
    const results = await Promise.all(
      moving.map(async (c) => ({ id: c.id, ok: await saveLibraryCard(c).catch(() => false) }))
    );
    const okIds = new Set(results.filter(r => r.ok).map(r => r.id));
    const okMoving = moving.filter(c => okIds.has(c.id));

    // 3) 저장 성공한 카드만 화면 map에서 이동
    setLibrary(prev => {
      const next = {};
      for (const [k, arr] of Object.entries(prev)) {
        next[k] = (arr || []).filter(c => !okIds.has(c.id));
      }
      if (!next[destKey]) next[destKey] = [];
      next[destKey] = [...next[destKey], ...okMoving];
      return next;
    });
    setLibrarySelected(new Set());
    if (okMoving.length < moving.length) {
      safeAlert(`${moving.length}장 중 ${okMoving.length}장만 이동됐습니다. 나머지는 다시 시도해주세요.`);
    }
  }, [librarySelected, library]);

  // useCallback으로 감싸서 함수 참조 안정화 (React.memo의 CardEditor가 불필요하게 리렌더링되는 것 방지)
  const updateCard = useCallback((id, updated) => {
    setCards(prev => prev.map(c => c.id === id ? updated : c));
  }, []);

  const deleteCard = useCallback((id) => {
    setCards(prev => {
      const next = prev.filter(c => c.id !== id);
      // 삭제로 0장이 되면 draft 자동저장이 스킵되므로(0장 저장 안 함),
      // 여기서 명시적으로 draft를 비워 새로고침 시 되살아나지 않게 함.
      if (next.length === 0 && draftKey) {
        try { localStorage.removeItem(draftKey); } catch {}
      }
      return next;
    });
  }, [draftKey]);

  const duplicateCard = useCallback((id) => {
    setCards(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx === -1) return prev;
      const copy = { ...prev[idx], id: newId() };
      return [...prev.slice(0, idx + 1), copy, ...prev.slice(idx + 1)];
    });
  }, []);

  const clearAll = () => {
    if (cards.length === 0) return;
    if (safeConfirm(`카드 ${cards.length}장을 모두 삭제할까요?`)) {
      setCards([]);
      // 명시적인 사용자 삭제 액션이므로 draft도 함께 삭제
      if (draftKey) {
        try { localStorage.removeItem(draftKey); } catch {}
      }
    }
  };

  // 이미지 편집 모달 열기 - 함수 참조 안정화 (React.memo와 함께 동작)
  const openImageEditor = useCallback((card) => {
    setEditingImageCard(card);
  }, []);

  // ───── 드래그 정렬 ───── (useCallback으로 함수 참조 안정화)
  const handleCardDragStart = useCallback((e, idx) => {
    setDraggingIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
    if (e.currentTarget) {
      e.dataTransfer.setData('text/plain', String(idx));
    }
  }, []);

  const handleCardDragOver = useCallback((e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // 자기 위로 드래그할 때는 표시 안 함 - setDragOverIndex가 자동 처리
    setDragOverIndex(idx);
  }, []);

  const handleCardDrop = useCallback((e, dropIdx) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === dropIdx) {
      setDraggingIndex(null);
      setDragOverIndex(null);
      return;
    }
    setCards(prev => {
      const visible = filterCategoryId
        ? prev.filter(c => c.categoryId === filterCategoryId)
        : prev;
      const fromCard = visible[draggingIndex];
      const toCard = visible[dropIdx];
      if (!fromCard || !toCard) return prev;
      const fromRealIdx = prev.findIndex(c => c.id === fromCard.id);
      const toRealIdx = prev.findIndex(c => c.id === toCard.id);
      if (fromRealIdx === -1 || toRealIdx === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromRealIdx, 1);
      next.splice(toRealIdx, 0, moved);
      return next;
    });
    setDraggingIndex(null);
    setDragOverIndex(null);
  }, [draggingIndex, filterCategoryId]);

  const handleCardDragEnd = useCallback(() => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  }, []);

  // 일괄 편집 적용 (라벨 + 카테고리 한꺼번에)
  const applyBulkEdit = (editedCards) => {
    setCards(editedCards);
  };

  // 카드 필터링 (카테고리 + 검색어) - useMemo로 캐싱하여 매 렌더링마다 재계산 방지
  const filteredCards = useMemo(() => {
    let result = filterCategoryId
      ? cards.filter(c => c.categoryId === filterCategoryId)
      : cards;
    const q = cardSearch.trim().toLowerCase();
    if (q) {
      result = result.filter(c => (c.label || '').toLowerCase().includes(q));
    }
    return result;
  }, [cards, filterCategoryId, cardSearch]);

  // 정렬 (실제 cards 배열은 그대로, 화면 표시만 정렬) - useMemo로 캐싱
  const visibleCards = useMemo(() => {
    if (sortMode === 'default') return filteredCards;
    const sorted = [...filteredCards];
    // 한국어 정렬을 위해 localeCompare 사용
    const collator = new Intl.Collator('ko', { sensitivity: 'base', numeric: true });
    if (sortMode === 'label') {
      sorted.sort((a, b) => collator.compare(a.label || '', b.label || ''));
    } else if (sortMode === 'category') {
      // 카테고리 이름순 → 그 안에서 라벨 가나다순
      const catName = (cid) => categories.find(c => c.id === cid)?.name || 'zzz_없음';
      sorted.sort((a, b) => {
        const catCmp = collator.compare(catName(a.categoryId), catName(b.categoryId));
        if (catCmp !== 0) return catCmp;
        return collator.compare(a.label || '', b.label || '');
      });
    } else if (sortMode === 'shortest') {
      sorted.sort((a, b) => (a.label || '').length - (b.label || '').length);
    } else if (sortMode === 'longest') {
      sorted.sort((a, b) => (b.label || '').length - (a.label || '').length);
    }
    return sorted;
  }, [filteredCards, sortMode, categories]);

  // 히스토리 권한 필터링
  // 관리자: 전체 / 선생님: 자기가 만든 것만 (개인정보 보호)
  const isAdmin = currentUser?.role === 'admin';
  const visibleHistory = isAdmin
    ? history
    : history.filter(h => h.ownerUsername === currentUser?.email);

  // ───── 인쇄 히스토리 관리 ─────

  // 두 카드 묶음이 같은 내용인지 비교 (이미지 + 라벨 + 순서)
  const isSameCardSet = (a, b) => {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if ((a[i].label || '') !== (b[i].label || '')) return false;
      if ((a[i].image || '') !== (b[i].image || '')) return false;
    }
    return true;
  };

  // 묶음 이름 자동 생성 헬퍼
  // 우선순위: 1) 카테고리 이름 (전부 같은 카테고리면) 2) 의미있는 짧은 라벨 3) "카드 N장"
  const generateBundleName = (cardsToName) => {
    if (!cardsToName || cardsToName.length === 0) return '빈 묶음';

    // 1) 모든 카드가 같은 카테고리면 카테고리 이름 사용
    const catIds = [...new Set(cardsToName.map(c => c.categoryId).filter(Boolean))];
    if (catIds.length === 1) {
      const cat = categories.find(c => c.id === catIds[0]);
      if (cat) {
        return cardsToName.length > 1
          ? `${cat.name} (${cardsToName.length}장)`
          : `${cat.name}`;
      }
    }

    // 1.5) 여러 카테고리가 있으면 카테고리 이름 조합
    if (catIds.length >= 2 && catIds.length <= 3) {
      const catNames = catIds
        .map(id => categories.find(c => c.id === id)?.name)
        .filter(Boolean);
      if (catNames.length >= 2) {
        return `${catNames.join('·')} (${cardsToName.length}장)`;
      }
    }

    // 2) 의미있는 짧은 라벨 찾기 (파일명 같은 긴 텍스트 거르기)
    const meaningfulLabels = cardsToName
      .map(c => (c.label || '').trim())
      .filter(l => {
        if (!l) return false;
        if (l.length > 15) return false; // 너무 긴 건 파일명 가능성 높음
        // 파일명 패턴 거르기
        if (/^(img|image|photo|pic|chatgpt|dall.?e|midjourney|sd|untitled|naver|screenshot|capture|스크린샷|캡처|사진|이미지)/i.test(l)) return false;
        if (/^(20\d{2}|19\d{2})[년\-\s\.]/.test(l)) return false;
        if (/^\d+$/.test(l)) return false; // 숫자만
        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(l)) return false;
        return true;
      });

    if (meaningfulLabels.length > 0) {
      const first = meaningfulLabels[0];
      if (cardsToName.length === 1) return first;
      // 2개 이상이면 처음 2개 라벨 + 외 N장
      if (meaningfulLabels.length >= 2) {
        const second = meaningfulLabels[1];
        const remaining = cardsToName.length - 2;
        if (remaining > 0) {
          return `${first}·${second} 외 ${remaining}장`;
        }
        return `${first}·${second}`;
      }
      return `${first} 외 ${cardsToName.length - 1}장`;
    }

    // 3) 의미있는 라벨 없으면 날짜+시간 + 카드 수
    const now = new Date();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${m}/${d} ${h}:${min} 카드 ${cardsToName.length}장`;
  };

  const saveCurrentToHistory = async (customName) => {
    // 필터링 중이면 보이는 카드만, 아니면 전체
    const cardsToSave = visibleCards;
    if (cardsToSave.length === 0) return;
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const autoName = (customName && customName.trim()) ? customName.trim() : generateBundleName(cardsToSave);

    const snapshot = {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: autoName,
      date: dateStr,
      timestamp: now.getTime(),
      cards: cardsToSave.map(c => ({ ...c })),
      sizeMm,
      labelPos,
      fontId,
      labelSize,
      ownerUsername: currentUser?.email || 'unknown',
      ownerName: currentUser?.name || '알 수 없음',
    };

    // 본인 묶음 중 중복 검사 - 본문 비교 필요하므로 본인 묶음만 본문 로드
    // 단, 아이 이름으로 저장할 땐 항상 새로 저장 (이름이 다르면 별개 세트로)
    const myStubs = (customName && customName.trim())
      ? []
      : history.filter(h => h.ownerUsername === currentUser?.email);
    let duplicateId = null;
    for (const stub of myStubs) {
      // 인덱스 카드 수와 다르면 본문 로드 안 해도 됨
      if (stub.cardCount !== cardsToSave.length) continue;
      // 본문 로드해서 비교
      const item = await loadHistoryItem(stub.id, currentUser);
      if (item && isSameCardSet(item.cards, cardsToSave)) {
        duplicateId = stub.id;
        break;
      }
    }

    if (duplicateId) {
      // 중복 - 메타만 갱신 (맨 앞으로)
      await moveHistoryToTop(duplicateId, dateStr, now.getTime(), currentUser);
    } else {
      // 새 추가
      await addHistoryItem(snapshot, currentUser);
    }

    // UI 갱신 - 인덱스 다시 로드
    await refreshHistory();
  };

  const loadFromHistory = async (snapshot) => {
    if (!snapshot) return;
    // 인덱스 stub인 경우 본문 로드
    let cardsToAdd = snapshot.cards;
    if (snapshot._isStub) {
      const item = await loadHistoryItem(snapshot.id, currentUser, snapshot._ownerId);
      if (!item || !Array.isArray(item.cards)) {
        safeAlert('이 묶음의 카드 데이터를 불러올 수 없습니다.');
        return;
      }
      cardsToAdd = item.cards;
    }
    if (!Array.isArray(cardsToAdd) || cardsToAdd.length === 0) return;
    const newCards = cardsToAdd.map(c => ({ ...c, id: newId() }));
    setCards(prev => [...prev, ...newCards]);
    setShowHistory(false);
    safeAlert(`"${snapshot.name}" 묶음에서 ${newCards.length}장 추가했습니다.`);
  };

  const deleteFromHistory = async (id) => {
    const target = history.find(h => h.id === id);
    if (!target) return;
    // 권한 체크: 삭제는 본인 소유 묶음만 (관리자도 남의 것은 조회만 가능)
    if (target.ownerUsername !== currentUser?.email) {
      safeAlert('다른 선생님의 묶음은 삭제할 수 없습니다. (조회만 가능)');
      return;
    }
    setHistory(prev => prev.filter(h => h.id !== id));
    try {
      await deleteHistoryItem(id, currentUser);
    } catch (e) {
      devWarn('저장소 삭제 실패:', e);
    }
  };

  const renameHistory = async (id, currentName) => {
    const target = history.find(h => h.id === id);
    if (!target) return;
    // 이름변경도 본인 소유만
    if (target.ownerUsername !== currentUser?.email) {
      safeAlert('다른 선생님의 묶음은 이름을 바꿀 수 없습니다. (조회만 가능)');
      return;
    }
    const newName = safePrompt('이 묶음의 이름을 정해주세요:', currentName);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) return;
    await updateHistoryMeta(id, { name: trimmed.slice(0, 30) });
    await refreshHistory();
  };

  // ───── 내보내기 / 불러오기 ─────

  // 묶음 한 개 또는 여러 개를 .json 파일로 다운로드
  const exportBundle = (bundles, filename) => {
    const data = {
      app: '검단ABA AAC maker',
      version: 1,
      exportedAt: new Date().toISOString(),
      bundles: bundles.map(b => ({
        name: b.name,
        date: b.date,
        cards: b.cards.map(c => ({ image: c.image, label: c.label })),
        sizeMm: b.sizeMm,
        labelPos: b.labelPos,
        fontId: b.fontId,
        labelSize: b.labelSize,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportSingle = async (h) => {
    // stub이면 본문 로드
    let cards = h.cards;
    if (h._isStub) {
      const item = await loadHistoryItem(h.id, currentUser, h._ownerId);
      if (!item || !Array.isArray(item.cards)) {
        safeAlert('본문을 불러올 수 없습니다.');
        return;
      }
      cards = item.cards;
    }
    const bundle = { ...h, cards };
    const safeName = h.name.replace(/[\\/:*?"<>|]/g, '_').slice(0, 30);
    exportBundle([bundle], `AAC_${safeName}_${h.date.replace(/[\/: ]/g, '-')}.json`);
  };

  const exportAll = async () => {
    // 권한 필터링: 관리자는 전체, 선생님은 자기 것만
    const myHistory = currentUser?.role === 'admin'
      ? history
      : history.filter(h => h.ownerUsername === currentUser?.email);
    if (myHistory.length === 0) {
      safeAlert('내보낼 묶음이 없습니다.');
      return;
    }
    // 모든 묶음의 본문 로드 (병렬)
    const withCards = await Promise.all(myHistory.map(async (h) => {
      if (h._isStub) {
        const item = await loadHistoryItem(h.id, currentUser, h._ownerId);
        return { ...h, cards: item?.cards || [] };
      }
      return h;
    }));
    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    exportBundle(withCards, `AAC_전체묶음_${withCards.length}개_${dateStr}.json`);
  };

  // 현재 편집 중인 카드 내보내기 (화면 정렬 + 필터 그대로 반영)
  const exportCurrent = () => {
    if (cards.length === 0) {
      safeAlert('내보낼 카드가 없습니다.');
      return;
    }
    // visibleCards = 카테고리 필터 + 정렬 + 검색 적용된 카드들
    const cardsToExport = visibleCards.length > 0 ? visibleCards : cards;
    const autoName = generateBundleName(cardsToExport);
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const safeName = autoName.replace(/[\\/:*?"<>|]/g, '_').slice(0, 30);
    exportBundle([{
      name: autoName,
      date: dateStr,
      cards: cardsToExport,
      sizeMm,
      labelPos,
      fontId,
      labelSize,
    }], `AAC_${safeName}.json`);
  };

  // .json 파일에서 묶음 불러오기 (히스토리에 추가)
  const importBundles = async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data || !Array.isArray(data.bundles)) {
        safeAlert('이 파일은 검단ABA AAC maker 파일이 아닙니다.');
        return;
      }

      let addedCount = 0;
      let skippedCount = 0;

      // 본인 묶음 본문을 미리 로드해서 중복 검사
      const myStubs = history.filter(h => h.ownerUsername === currentUser?.email);

      for (const b of data.bundles) {
        if (!Array.isArray(b.cards) || b.cards.length === 0) continue;

        // 본인 묶음 중 카드 수 일치하는 것만 본문 로드해서 비교
        let isDup = false;
        for (const stub of myStubs) {
          if (stub.cardCount !== b.cards.length) continue;
          const item = await loadHistoryItem(stub.id, currentUser);
          if (item && isSameCardSet(item.cards, b.cards)) {
            isDup = true;
            break;
          }
        }

        if (isDup) {
          skippedCount++;
          continue;
        }

        const now = new Date();
        const snapshot = {
          id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 6)}_${addedCount}`,
          name: b.name || '불러온 묶음',
          date: b.date || `${now.getMonth() + 1}/${now.getDate()}`,
          timestamp: now.getTime() + addedCount,
          cards: b.cards.map(c => ({
            id: newId(),
            image: c.image || '',
            label: c.label || '',
          })),
          sizeMm: b.sizeMm || 45,
          labelPos: b.labelPos || 'bottom',
          fontId: b.fontId || 'round',
          labelSize: b.labelSize || 14,
          ownerUsername: currentUser?.email || 'unknown',
          ownerName: currentUser?.name || '알 수 없음',
        };
        await addHistoryItem(snapshot, currentUser);
        addedCount++;
      }

      await refreshHistory();

      const msg = [];
      if (addedCount > 0) msg.push(`${addedCount}개 묶음을 추가했습니다.`);
      if (skippedCount > 0) msg.push(`이미 있는 묶음 ${skippedCount}개는 건너뛰었습니다.`);
      if (msg.length === 0) msg.push('새로 추가된 묶음이 없습니다.');
      safeAlert(msg.join('\n'));
      setShowHistory(true);
    } catch (e) {
      devError('불러오기 실패:', e);
      safeAlert('파일을 읽을 수 없습니다. 올바른 .json 파일인지 확인해주세요.');
    }
  };

  const importFileRef = useRef(null);
  const handleImportClick = () => importFileRef.current?.click();
  const handleImportChange = (e) => {
    const file = e.target.files?.[0];
    if (file) importBundles(file);
    e.target.value = '';
  };

  // ───── 라이브러리로 묶음(.json) 불러오기 ─────
  // 파일 안 모든 묶음의 카드를 "지금 보고 있는 라이브러리 카테고리"에 넣음
  const importToLibrary = async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.bundles)) {
        safeAlert('이 파일은 검단ABA AAC maker 파일이 아닙니다.');
        return;
      }
      const incoming = [];
      for (const b of data.bundles) {
        if (!Array.isArray(b.cards)) continue;
        for (const c of b.cards) {
          if (!c.image) continue;
          incoming.push({ id: newId(), image: c.image, originalImage: c.originalImage || null, label: c.label || '' });
        }
      }
      if (incoming.length === 0) { safeAlert('불러올 카드가 없습니다.'); return; }
      const { okCount, failCount } = await addCardsToLibrary(incoming, libraryCatId);
      const catName = libraryCatId
        ? (categories.find(c => c.id === libraryCatId)?.name || '카테고리')
        : '미분류';
      if (failCount > 0) {
        safeAlert(`"${catName}"에 ${okCount}장 저장됨.\n${failCount}장은 저장 실패(용량 문제일 수 있음).`);
      } else {
        safeAlert(`"${catName}"에 ${okCount}장을 추가했습니다.`);
      }
    } catch (e) {
      devError('라이브러리 불러오기 실패:', e);
      safeAlert('파일을 읽을 수 없습니다. 올바른 .json 파일인지 확인해주세요.');
    }
  };
  const libraryImportFileRef = useRef(null);
  const handleLibraryImportClick = () => libraryImportFileRef.current?.click();
  const handleLibraryImportChange = (e) => {
    const file = e.target.files?.[0];
    if (file) importToLibrary(file);
    e.target.value = '';
  };

  // 인쇄 (PDF 저장은 브라우저 인쇄 → PDF로 저장)
  // 1단계: 미리보기 화면으로 이동 (sandbox에서는 window.print 차단되므로 사용자가 직접 누르도록)
  const handlePrint = async () => {
    if (cards.length === 0) {
      safeAlert('카드를 먼저 추가해주세요!');
      return;
    }
    if (visibleCards.length === 0) {
      safeAlert('지금 필터링 중인 카테고리에는 카드가 없습니다.\n전체 카드를 인쇄하려면 "전체 카드" 필터를 선택해주세요.');
      return;
    }
    // 미리보기 화면으로 이동
    setView('preview');
    // 인쇄 직전 히스토리에 자동 저장 (백그라운드)
    saveCurrentToHistory().catch(err => devWarn('히스토리 저장 실패:', err));
    // 미리보기 영역 맨 위로 스크롤
    // Claude 산출물 sandbox 환경에서는 window.print()가 차단되므로 사용자가 Ctrl+P를 직접 눌러야 함
    // 미리보기 화면에 큰 안내 메시지가 있음
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // 키보드 포커스를 메인 영역으로 옮겨 Ctrl+P가 잘 작동하도록
      try { document.activeElement?.blur(); } catch {}
    }, 100);
  };

  // 미리보기 화면에서 실제 인쇄 실행 (사용자가 명시적으로 클릭)
  const doActualPrint = async () => {
    // 인쇄 직전 폰트 로딩 한 번 더 보장 (미리보기 진입 직후 바로 클릭한 경우 대비)
    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
    } catch {
      // 폰트 대기 실패해도 인쇄는 계속 시도
    }
    // 방법 1: window.print() 직접
    try {
      window.print();
      return;
    } catch (err) {
      devWarn('방법 1 실패 (window.print):', err);
    }

    // 방법 2: parent window의 print 호출 (iframe 안일 때 부모로 시도)
    try {
      if (window.parent && window.parent !== window) {
        window.parent.print();
        return;
      }
    } catch (err) {
      devWarn('방법 2 실패 (parent.print):', err);
    }

    // 방법 3: 키보드 이벤트로 Ctrl+P 시뮬레이션 시도
    try {
      const event = new KeyboardEvent('keydown', {
        key: 'p',
        code: 'KeyP',
        keyCode: 80,
        which: 80,
        ctrlKey: true,
        metaKey: false,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);
      window.dispatchEvent(event);
      // 일반적으로 안 됨 (브라우저는 합성 키 이벤트로 인쇄 안 띄움) 하지만 시도는 함
    } catch (err) {
      devWarn('방법 3 실패 (synthetic keypress):', err);
    }

    // 방법 4: 위 모든 게 안 됐을 때 — 토스트로 키보드 안내
    safeAlert('🖨️ 인쇄 대화상자가 자동으로 안 열리네요.\n\n키보드의 Ctrl+P (Mac: Cmd+P)를 직접 눌러주세요.\n인쇄 대상에서 "PDF로 저장"을 선택하면 됩니다.');
  };

  // ───── 로그인 안 된 경우 ─────
  if (!authChecked) {
    // 초기 세션 체크 중 - 빈 화면
    return <div className="min-h-screen bg-stone-50" />;
  }
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 print:min-h-0" style={{ fontFamily: font.css }}>
      {/* 이미지 처리 중 배너 - 우상단 고정. 사용자가 여러 장 추가했을 때 "안 눌렸나?" 오해 방지 */}
      {imageProcessing && (
        <div
          className="fixed top-20 right-4 z-[60] bg-white border border-stone-300 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 no-print"
          role="status"
          aria-live="polite"
        >
          <span className="inline-block w-4 h-4 border-2 border-stone-700 border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
          <span className="text-sm text-stone-800 font-medium">
            이미지 처리 중 ({imageProcessing.current} / {imageProcessing.total})
          </span>
        </div>
      )}

      {/* 사용자 관리 모달 (관리자 전용) */}
      {showUserManagement && currentUser.role === 'admin' && (
        <UserManagement
          users={users}
          currentUser={currentUser}
          onUpdate={setUsers}
          onImportCard={addCardsToLibrary}
          onClose={() => setShowUserManagement(false)}
        />
      )}

      {/* 카테고리 관리 모달 */}
      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onUpdate={handleCategoriesUpdate}
          onClose={() => setShowCategoryManager(false)}
        />
      )}

      {/* 첫 사용 튜토리얼 */}
      {showTutorial && (
        <TutorialOverlay onClose={closeTutorial} />
      )}

      {/* 일괄 라벨 편집 모달 */}
      {showBulkEditor && cards.length > 0 && (
        <BulkLabelEditor
          cards={cards}
          categories={categories}
          onUpdate={applyBulkEdit}
          onClose={() => setShowBulkEditor(false)}
        />
      )}

      {/* 이미지 편집 모달 */}
      {editingImageCard && (
        <ImageEditor
          card={editingImageCard}
          onSave={(updatedCard) => {
            updateCard(updatedCard.id, updatedCard);
            setEditingImageCard(null);
          }}
          onClose={() => setEditingImageCard(null)}
        />
      )}


      {/* 묶음 불러오기 모달 (자동 저장 + 외부 파일) */}
      {showBundleLoader && (() => {
        const visibleHistory = currentUser?.role === 'admin'
          ? history
          : history.filter(h => h.ownerUsername === currentUser?.email);
        const filtered = historySearch.trim()
          ? visibleHistory.filter(h =>
              h.name.toLowerCase().includes(historySearch.toLowerCase()) ||
              (h.ownerName || '').toLowerCase().includes(historySearch.toLowerCase())
            )
          : visibleHistory;
        return (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                 style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
              {/* 헤더 */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-stone-700" />
                  <h2 className="text-base font-bold text-stone-900">묶음 불러오기</h2>
                </div>
                <button onClick={() => setShowBundleLoader(false)} className="p-2 hover:bg-stone-100 rounded-lg transition">
                  <X className="w-4 h-4 text-stone-600" />
                </button>
              </div>

              {/* 탭 */}
              <div className="px-5 pt-3 border-b border-stone-100">
                <div className="flex gap-1 bg-stone-100 rounded-lg p-1">
                  <button
                    onClick={() => setBundleLoaderTab('saved')}
                    className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition relative ${
                      bundleLoaderTab === 'saved'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                  >
                    저장된 묶음
                    {visibleHistory.length > 0 && (
                      <span className="ml-1 text-[10px] font-bold text-white bg-amber-500 rounded-full px-1.5 py-0.5 tabular-nums">
                        {visibleHistory.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setBundleLoaderTab('file')}
                    className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition ${
                      bundleLoaderTab === 'file'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                  >
                    파일에서 불러오기
                  </button>
                </div>
                <p className="text-[10px] text-stone-500 mt-2 px-1">
                  {bundleLoaderTab === 'saved'
                    ? (isAdmin ? '관리자: 모든 선생님의 묶음을 봅니다' : '내가 인쇄한 카드 묶음을 다시 불러올 수 있어요')
                    : '다른 선생님이 카톡으로 보내준 .json 파일을 불러오기'}
                </p>
              </div>

              {/* 본문 */}
              <div className="flex-1 overflow-y-auto p-4">
                {bundleLoaderTab === 'saved' ? (
                  <>
                    {/* 검색 */}
                    {visibleHistory.length > 3 && (
                      <div className="mb-3 flex items-center gap-1.5 bg-stone-100 rounded-lg px-3 py-2">
                        <Search className="w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="text"
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          placeholder="이름으로 검색"
                          className="flex-1 bg-transparent text-xs outline-none text-stone-800"
                        />
                      </div>
                    )}

                    {/* 목록 */}
                    {filtered.length === 0 ? (
                      <div className="py-12 text-center">
                        <History className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                        <p className="text-sm text-stone-500">
                          {historySearch ? '검색 결과가 없습니다' : '아직 저장된 묶음이 없습니다'}
                        </p>
                        {!historySearch && (
                          <p className="text-xs text-stone-400 mt-1">PDF로 저장할 때 자동으로 보관됩니다</p>
                        )}
                      </div>
                    ) : isAdmin ? (
                      // ───── 관리자: 선생님별 폴더 그룹화 ─────
                      (() => {
                        // 선생님별로 그룹화
                        const groups = {};
                        filtered.forEach(h => {
                          const owner = h.ownerUsername || 'unknown';
                          if (!groups[owner]) {
                            groups[owner] = { name: h.ownerName || '알 수 없음', items: [] };
                          }
                          groups[owner].items.push(h);
                        });
                        // 본인 묶음을 맨 위로, 나머지는 이름순
                        const sortedOwners = Object.keys(groups).sort((a, b) => {
                          if (a === currentUser?.email) return -1;
                          if (b === currentUser?.email) return 1;
                          return groups[a].name.localeCompare(groups[b].name);
                        });
                        return (
                          <div className="space-y-2">
                            {sortedOwners.map(owner => {
                              const group = groups[owner];
                              const isOpen = expandedOwners[owner] !== false; // 기본 펼침
                              const isMine = owner === currentUser?.email;
                              return (
                                <div key={owner} className="bg-stone-50 border border-stone-200 rounded-lg overflow-hidden">
                                  {/* 폴더 헤더 */}
                                  <button
                                    onClick={() => setExpandedOwners(prev => ({ ...prev, [owner]: !isOpen }))}
                                    className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-stone-100 transition"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                        isMine ? 'bg-amber-100 text-amber-700' : 'bg-stone-200 text-stone-600'
                                      }`}>
                                        {(group.name || '?').charAt(0)}
                                      </div>
                                      <div className="text-left">
                                        <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                                          {group.name}
                                          {isMine && (
                                            <span className="text-[9px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">나</span>
                                          )}
                                        </div>
                                        <div className="text-[10px] text-stone-500">{group.items.length}개 묶음</div>
                                      </div>
                                    </div>
                                    {isOpen ? (
                                      <ChevronUp className="w-4 h-4 text-stone-400" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-stone-400" />
                                    )}
                                  </button>

                                  {/* 폴더 내용 */}
                                  {isOpen && (
                                    <div className="px-2 pb-2 space-y-1.5 bg-white">
                                      {group.items.map((h) => (
                                        <div key={h.id} className="bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-300 transition">
                                          <div className="flex items-start gap-3 mb-2">
                                            {/* 썸네일 */}
                                            <div className="flex-shrink-0 grid grid-cols-2 gap-0.5 w-12 h-12">
                                              {(h.thumbnails || h.cards?.slice(0, 4).map(c => c.image) || []).slice(0, 4).map((thumb, i) => (
                                                thumb ? (
                                                  <img key={i} src={thumb} alt="" className="w-full h-full object-cover rounded-sm" />
                                                ) : (
                                                  <div key={i} className="w-full h-full bg-stone-100 rounded-sm" />
                                                )
                                              ))}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-sm font-bold text-stone-900 truncate">{h.name}</p>
                                              <p className="text-[10px] text-stone-500">
                                                {h.date} · {h.cardCount || h.cards?.length || 0}장 · {h.sizeMm}mm
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1 mt-2">
                                            <button
                                              onClick={() => { loadFromHistory(h); setShowBundleLoader(false); }}
                                              className="flex-1 min-w-0 px-2 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold rounded transition flex items-center justify-center gap-1"
                                            >
                                              <Plus className="w-3 h-3" strokeWidth={2.5} />
                                              추가
                                            </button>
                                            <button
                                              onClick={() => exportSingle(h)}
                                              className="p-2 bg-white hover:bg-blue-50 hover:border-blue-200 border border-stone-200 text-stone-600 hover:text-blue-600 rounded transition flex-shrink-0"
                                              title="이 묶음 파일로 내보내기"
                                            >
                                              <Share2 className="w-3.5 h-3.5" />
                                            </button>
                                            {isMine && (
                                            <button
                                              onClick={() => renameHistory(h.id, h.name)}
                                              className="p-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 rounded transition flex-shrink-0"
                                              title="이름 바꾸기"
                                            >
                                              <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            )}
                                            {isMine && (
                                            <button
                                              onClick={() => deleteFromHistory(h.id)}
                                              className="p-2 bg-white hover:bg-red-50 hover:border-red-200 border border-stone-200 text-stone-600 hover:text-red-500 rounded transition flex-shrink-0"
                                              title="삭제"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()
                    ) : (
                      // ───── 선생님: 자기 묶음만 평탄한 리스트 ─────
                      <div className="space-y-2">
                        {filtered.map((h) => (
                          <div key={h.id} className="bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-300 transition">
                            <div className="flex items-start gap-3 mb-2">
                              {/* 썸네일 */}
                              <div className="flex-shrink-0 grid grid-cols-2 gap-0.5 w-12 h-12">
                                {(h.thumbnails || h.cards?.slice(0, 4).map(c => c.image) || []).slice(0, 4).map((thumb, i) => (
                                  thumb ? (
                                    <img key={i} src={thumb} alt="" className="w-full h-full object-cover rounded-sm" />
                                  ) : (
                                    <div key={i} className="w-full h-full bg-stone-100 rounded-sm" />
                                  )
                                ))}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-stone-900 truncate">{h.name}</p>
                                <p className="text-[10px] text-stone-500">
                                  {h.date} · {h.cardCount || h.cards?.length || 0}장 · {h.sizeMm}mm
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <button
                                onClick={() => { loadFromHistory(h); setShowBundleLoader(false); }}
                                className="flex-1 min-w-0 px-2 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold rounded transition flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3 h-3" strokeWidth={2.5} />
                                추가
                              </button>
                              <button
                                onClick={() => exportSingle(h)}
                                className="p-2 bg-white hover:bg-blue-50 hover:border-blue-200 border border-stone-200 text-stone-600 hover:text-blue-600 rounded transition flex-shrink-0"
                                title="이 묶음 파일로 내보내기"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => renameHistory(h.id, h.name)}
                                className="p-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 rounded transition flex-shrink-0"
                                title="이름 바꾸기"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteFromHistory(h.id)}
                                className="p-2 bg-white hover:bg-red-50 hover:border-red-200 border border-stone-200 text-stone-600 hover:text-red-500 rounded transition flex-shrink-0"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* 파일 탭 */
                  <div className="py-8">
                    <button
                      onClick={() => {
                        handleImportClick();
                        setShowBundleLoader(false);
                      }}
                      className="w-full py-12 border-2 border-dashed border-stone-300 hover:border-amber-400 hover:bg-amber-50 rounded-lg transition flex flex-col items-center justify-center gap-3"
                    >
                      <Upload className="w-12 h-12 text-stone-400" />
                      <div>
                        <p className="text-sm font-bold text-stone-900">.json 파일 선택</p>
                        <p className="text-[11px] text-stone-500 mt-1">카톡 등으로 받은 묶음 파일</p>
                      </div>
                    </button>
                    <div className="mt-6 bg-stone-50 rounded-lg p-3">
                      <p className="text-[11px] font-bold text-stone-700 mb-1">📤 파일 만들기</p>
                      <p className="text-[10px] text-stone-600 leading-relaxed">
                        저장된 묶음에서 <Share2 className="w-3 h-3 inline mx-0.5" /> 아이콘을 누르거나, 사이드바 "현재 카드 내보내기"를 눌러서 .json 파일로 저장할 수 있어요.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* 인쇄 전용 스타일 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Serif+KR:wght@400;600&display=swap');

        @media print {
          @page { size: A4; margin: 0; }
          html, body { min-height: 0 !important; height: auto !important; margin: 0 !important; padding: 0 !important; background: white !important; }
          body { background: white !important; }
          .no-print { display: none !important; }
          [data-print-page] { page-break-after: always; box-shadow: none !important; margin: 0 !important; }
          [data-print-page]:last-child { page-break-after: auto; }
        }
      `}</style>

      {/* 상단 바 */}
      <header className="no-print sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-stone-100 rounded-md transition flex-shrink-0"
              title="메뉴"
              aria-label="메뉴 열기"
            >
              <Menu className="w-5 h-5 text-stone-700" />
            </button>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm overflow-hidden p-1 flex-shrink-0">
              <img src={LOGO_DATA_URL} alt="검단ABA" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-stone-900 leading-tight truncate">검단ABA AAC maker</h1>
              <p className="hidden sm:block text-[11px] text-stone-500 leading-tight truncate">
                언어행동연구소
                {cards.length > 0 && (
                  <>
                    {' · '}
                    <span className="font-semibold text-stone-700">{cards.length}장</span>
                    {cards.filter(c => c.label.trim()).length < cards.length && (
                      <span className="text-amber-600">
                        {' '}(글자 {cards.filter(c => c.label.trim()).length}장)
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 flex-nowrap">
            <div className="hidden md:flex items-center bg-stone-100 rounded-lg p-0.5">
              <button
                onClick={() => setView('edit')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${view === 'edit' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                편집
              </button>
              <button
                onClick={() => setView('preview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${view === 'preview' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                인쇄 미리보기
              </button>
            </div>
            {/* 모바일: 편집/미리보기 단일 토글 버튼 */}
            <button
              onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}
              className="md:hidden p-2 hover:bg-stone-100 rounded-md transition"
              title={view === 'edit' ? '인쇄 미리보기' : '편집으로'}
            >
              <Eye className="w-4 h-4 text-stone-700" />
            </button>
            <button
              onClick={() => setShowBundleLoader(true)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold rounded-lg shadow-sm transition relative"
              title="저장된 묶음 / 파일 불러오기"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">묶음 불러오기</span>
              {history.filter(h => currentUser?.role === 'admin' || h.ownerUsername === currentUser?.email).length > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] font-bold text-white bg-amber-500 rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center tabular-nums">
                  {history.filter(h => currentUser?.role === 'admin' || h.ownerUsername === currentUser?.email).length}
                </span>
              )}
            </button>
            <input
              ref={importFileRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportChange}
              className="hidden"
            />

            {/* 구분선 */}
            <div className="hidden sm:block h-6 w-px bg-stone-200 mx-1 flex-shrink-0" />

            {/* 사용자 메뉴 */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${currentUser.role === 'admin' ? 'bg-amber-100' : 'bg-stone-200'}`}>
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                ) : (
                  <span className="text-[10px] font-bold text-stone-600">
                    {(currentUser.name || currentUser.email || '?').charAt(0)}
                  </span>
                )}
              </div>
              {/* 사용자 이름 - 넓은 화면에서만 표시, 좁으면 자동 숨김 */}
              <div className="hidden md:block leading-tight pr-1 max-w-[80px] overflow-hidden">
                <p className="text-[11px] font-bold text-stone-900 truncate whitespace-nowrap">{currentUser.name || currentUser.email}</p>
                <p className="text-[9px] text-stone-500 whitespace-nowrap">
                  {currentUser.role === 'admin' ? '관리자' : '선생님'}
                </p>
              </div>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowUserManagement(true)}
                  className="p-1.5 hover:bg-stone-100 rounded-md transition flex-shrink-0"
                  title="선생님 계정 관리"
                >
                  <Users className="w-3.5 h-3.5 text-stone-600" />
                </button>
              )}
              <button
                onClick={() => setShowTutorial(true)}
                className="hidden sm:flex p-1.5 hover:bg-stone-100 rounded-md transition flex-shrink-0"
                title="사용법 다시 보기"
              >
                <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-md transition text-stone-600 flex-shrink-0"
                title="로그아웃"
                aria-label="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6 grid grid-cols-12 gap-3 sm:gap-6 print:max-w-none print:p-0 print:m-0 print:block print:gap-0">
        {/* 모바일 백드롭 */}
        {mobileSidebarOpen && (
          <div
            className="no-print md:hidden fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* 왼쪽 설정 패널 - 데스크탑에선 sticky 사이드바, 모바일에선 슬라이드 패널 */}
        <aside className={`no-print col-span-12 md:col-span-3 space-y-4 ${
          mobileSidebarOpen
            ? 'fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-stone-50 overflow-y-auto p-4 shadow-2xl md:static md:p-0 md:bg-transparent md:shadow-none md:overflow-visible'
            : 'hidden md:block'
        }`}>
          {/* 모바일 사이드바 헤더 (닫기 버튼) */}
          {mobileSidebarOpen && (
            <div className="md:hidden flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <h2 className="text-base font-bold text-stone-900">메뉴</h2>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 hover:bg-stone-200 rounded-md transition"
              >
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition"
            >
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-bold text-stone-900">설정</h2>
                {(doubleSided || cardRadius > 0 || safetyMargin > 0 || !showCutLines || cutLineStyle !== 'dashed') && (
                  <span className="text-[10px] font-medium text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
                    인쇄 옵션 적용 중
                  </span>
                )}
              </div>
              {settingsOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {settingsOpen && (
              <div className="px-5 pb-5 border-t border-stone-100 pt-4">
            {/* 탭 헤더 */}
            <div className="flex gap-1 bg-stone-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setSettingsTab('card')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  settingsTab === 'card'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                카드 설정
              </button>
              <button
                onClick={() => setSettingsTab('print')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition relative ${
                  settingsTab === 'print'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                인쇄 옵션
                {(doubleSided || cardRadius > 0 || safetyMargin > 0 || !showCutLines || cutLineStyle !== 'dashed') && (
                  <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                )}
              </button>
            </div>

            {/* 탭 내용: 카드 설정 */}
            {settingsTab === 'card' && (
              <div>
                {/* 크기 */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 block">크기</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.mm}
                        onClick={() => setSizeMm(opt.mm)}
                        className={`px-2 py-2 rounded-lg text-xs font-semibold transition border ${
                          sizeMm === opt.mm
                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div>{opt.label}</div>
                        <div className="text-[10px] font-normal opacity-70">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 라벨 위치 */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 block">글자 위치</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LABEL_POS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setLabelPos(opt.id)}
                        className={`px-2 py-2 rounded-lg text-xs font-medium transition border ${
                          labelPos === opt.id
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 폰트 */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 block">글씨체</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {FONT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setFontId(opt.id)}
                        style={{ fontFamily: opt.css }}
                        className={`px-2 py-2 rounded-lg text-sm font-semibold transition border ${
                          fontId === opt.id
                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 글자 크기 */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">글자 크기</label>
                    <span className="text-xs font-bold text-stone-700 tabular-nums">{labelSize}px</span>
                  </div>
                  <input
                    type="range" min="8" max="24" value={labelSize}
                    onChange={(e) => setLabelSize(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* 카드 간격 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">카드 간격</label>
                    <span className="text-xs font-bold text-stone-700 tabular-nums">{gap}mm</span>
                  </div>
                  <input
                    type="range" min="0" max="10" value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            )}

            {/* 탭 내용: 인쇄 옵션 */}
            {settingsTab === 'print' && (
              <div className="space-y-4">
                {/* 자르는 선 */}
                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-stone-900">자르는 선</div>
                      <div className="text-[10px] text-stone-500">카드 자를 때 따라가는 선</div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showCutLines}
                        onChange={(e) => setShowCutLines(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-checked:bg-amber-500 rounded-full transition" />
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition shadow" />
                    </div>
                  </label>
                  {showCutLines && (
                    <div className="mt-2.5 space-y-2.5 pl-1">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-semibold text-stone-600">선 굵기</label>
                          <span className="text-[10px] font-bold text-stone-700 tabular-nums">{cutLineWidth}px</span>
                        </div>
                        <input
                          type="range" min="0.5" max="3" step="0.5" value={cutLineWidth}
                          onChange={(e) => setCutLineWidth(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-stone-600 block mb-1">선 종류</label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: 'dashed', label: '점선', preview: '╌╌' },
                            { id: 'dotted', label: '도트', preview: '⋯⋯' },
                            { id: 'solid', label: '실선', preview: '──' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setCutLineStyle(opt.id)}
                              className={`px-1 py-1.5 rounded text-[10px] font-semibold transition border ${
                                cutLineStyle === opt.id
                                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                              }`}
                            >
                              <div className="text-sm leading-none mb-0.5">{opt.preview}</div>
                              <div>{opt.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 모서리 둥글기 */}
                <div className="border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-900">모서리 둥글기</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">
                      {cardRadius === 0 ? '없음' : `${cardRadius}mm`}
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="8" value={cardRadius}
                    onChange={(e) => setCardRadius(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-[10px] text-stone-500 mt-0.5">가위질 후 모서리 안전</p>
                </div>

                {/* 코팅 여백 */}
                <div className="border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-900">코팅 여백</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">
                      {safetyMargin === 0 ? '없음' : `${safetyMargin}mm`}
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="5" value={safetyMargin}
                    onChange={(e) => setSafetyMargin(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-[10px] text-stone-500 mt-0.5">코팅 후 자르기용 여백</p>
                </div>

                {/* 양면 인쇄 */}
                <div className="border-t border-stone-100 pt-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-stone-900">양면 인쇄</div>
                      <div className="text-[10px] text-stone-500">앞면 + 뒷면 인쇄</div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={doubleSided}
                        onChange={(e) => setDoubleSided(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-checked:bg-amber-500 rounded-full transition" />
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition shadow" />
                    </div>
                  </label>

                  {doubleSided && (
                    <div className="mt-2.5 space-y-2.5 pl-1">
                      <div>
                        <label className="text-[10px] font-semibold text-stone-600 block mb-1">뒷면 디자인</label>
                        <div className="grid grid-cols-2 gap-1">
                          {[
                            { id: 'label', label: '글자만' },
                            { id: 'logo', label: '로고' },
                            { id: 'solid', label: '단색' },
                            { id: 'pattern', label: '패턴' },
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setBackDesign(opt.id)}
                              className={`px-2 py-1.5 text-[10px] font-medium rounded border transition ${
                                backDesign === opt.id
                                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {(backDesign === 'solid' || backDesign === 'pattern') && (
                        <div>
                          <label className="text-[10px] font-semibold text-stone-600 block mb-1">뒷면 색</label>
                          <div className="flex gap-1 flex-wrap">
                            {['#fef3c7', '#fee2e2', '#dbeafe', '#dcfce7', '#f3e8ff', '#f5f5f4', '#1c1917'].map(c => (
                              <button
                                key={c}
                                onClick={() => setBackColor(c)}
                                className={`w-6 h-6 rounded-md border-2 transition ${
                                  backColor === c ? 'border-stone-900 scale-110' : 'border-stone-200'
                                }`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-[9px] text-amber-700 bg-amber-50 rounded px-2 py-1.5 leading-snug">
                        💡 짝수 페이지를 뒤집어 다시 넣기
                      </p>
                    </div>
                  )}
                </div>

                {/* 기본값으로 */}
                <button
                  onClick={() => {
                    setCardRadius(0);
                    setSafetyMargin(0);
                    setDoubleSided(false);
                    setBackDesign('label');
                    setBackColor('#fef3c7');
                    setShowCutLines(true);
                    setCutLineWidth(1);
                    setCutLineStyle('dashed');
                  }}
                  className="w-full px-3 py-2 mt-2 text-[11px] font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-lg transition"
                >
                  ↺ 인쇄 옵션 기본값으로
                </button>
              </div>
            )}
              </div>
            )}
          </div>

          {/* 카드 정렬 */}
          {cards.length > 1 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpDown className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-bold text-stone-900">카드 정렬</h2>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'default', label: '원래 순서', desc: '추가한대로' },
                  { id: 'label', label: '가나다순', desc: 'ㄱ→ㅎ' },
                  { id: 'category', label: '카테고리순', desc: '같은것끼리' },
                  { id: 'shortest', label: '짧은 라벨', desc: '글자 적은순' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortMode(opt.id)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition border ${
                      sortMode === opt.id
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div>{opt.label}</div>
                    <div className="text-[10px] font-normal opacity-70">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {sortMode !== 'default' && (
                <p className="text-[10px] text-amber-700 bg-amber-50 rounded px-2 py-1.5 mt-2 leading-snug">
                  💡 정렬된 순서대로 인쇄/저장됩니다 · 원본 카드 순서는 그대로 유지
                </p>
              )}
            </div>
          )}

          {/* 카드 액션 (카드가 있을 때만) */}
          {cards.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
              <button
                onClick={() => setShowBulkEditor(true)}
                className="w-full py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 border border-stone-200 hover:border-amber-200 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3 h-3" />
                일괄 라벨 편집
              </button>
              <button
                onClick={exportCurrent}
                className="w-full py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3 h-3" />
                현재 카드 내보내기
              </button>
              <button
                onClick={clearAll}
                className="w-full py-2 text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3 h-3" />
                전체 삭제
              </button>
            </div>
          )}

          {/* 카테고리 패널 (접기 가능) — 라이브러리 도입으로 숨김. 카테고리 관리는 상단 '카테고리' 탭에서. */}
          {false && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition"
            >
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-bold text-stone-900">카테고리</h2>
                {categories.length > 0 && (
                  <span className="text-[10px] font-bold text-white bg-amber-500 rounded-full px-1.5 py-0.5 tabular-nums min-w-[18px] text-center">
                    {categories.length}
                  </span>
                )}
                {filterCategoryId && (
                  <span className="text-[10px] font-medium text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
                    필터 중
                  </span>
                )}
              </div>
              {categoryOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {categoryOpen && (
              <div className="px-5 pb-5 border-t border-stone-100">
                <div className="flex justify-end mb-3 mt-3">
                  <button
                    onClick={() => setShowCategoryManager(true)}
                    className="p-1.5 hover:bg-stone-100 rounded transition"
                    title="카테고리 관리"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                </div>

            {categories.length === 0 ? (
              <button
                onClick={() => setShowCategoryManager(true)}
                className="w-full py-3 text-xs font-medium text-stone-500 hover:text-amber-700 border-2 border-dashed border-stone-200 hover:border-amber-300 hover:bg-amber-50 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                카테고리 만들기
              </button>
            ) : (
              <>
                {/* 필터 버튼들 */}
                <div className="space-y-1">
                  <button
                    onClick={() => setFilterCategoryId(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition flex items-center justify-between ${
                      filterCategoryId === null
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span>전체 카드</span>
                    <span className="text-[10px] opacity-70 tabular-nums">{cards.length}</span>
                  </button>
                  {categories.map((c) => {
                    const count = cards.filter(card => card.categoryId === c.id).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setFilterCategoryId(c.id === filterCategoryId ? null : c.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 ${
                          filterCategoryId === c.id
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-[10px] opacity-70 tabular-nums flex-shrink-0">{count}</span>
                      </button>
                    );
                  })}
                </div>
                {filterCategoryId && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 rounded px-2 py-1 mt-2 text-center">
                    💡 필터링 중 - 인쇄 시 보이는 카드만 출력됩니다
                  </p>
                )}
              </>
            )}
              </div>
            )}
          </div>
          )}

        </aside>

        {/* 메인 영역 */}
        <main className="col-span-12 md:col-span-9">
          {/* 인쇄판 ⇄ 라이브러리 전환 토글 */}
          <div className="no-print flex items-center gap-1 bg-stone-100 rounded-xl p-1 mb-4">
            <button
              onClick={() => setViewMode('print')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                viewMode === 'print' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <FileDown className="w-4 h-4" /> 인쇄판
              {cards.length > 0 && <span className="tabular-nums opacity-70">{cards.length}</span>}
            </button>
            <button
              onClick={() => setViewMode('library')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                viewMode === 'library' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Folder className="w-4 h-4" /> 카테고리
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                viewMode === 'board' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Volume2 className="w-4 h-4" /> 말하는 판
            </button>
          </div>

          {viewMode === 'board' ? (
            <SpeakingBoardView
              currentUser={currentUser}
              library={library}
              setLibrary={setLibrary}
              categories={categories}
              setCategories={setCategories}
            />
          ) : viewMode === 'library' ? (
            <>
            <input
              ref={libraryImportFileRef}
              type="file"
              accept="application/json,.json"
              onChange={handleLibraryImportChange}
              className="hidden"
            />
            <input
              ref={libraryImageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={onFileChange}
              className="hidden"
            />
            <LibraryView
              library={library}
              categories={categories}
              libraryCatId={libraryCatId}
              setLibraryCatId={setLibraryCatId}
              selected={librarySelected}
              setSelected={setLibrarySelected}
              onAddToPrint={addSelectedToPrint}
              onAddImagesClick={() => libraryImageInputRef.current?.click()}
              onImportClick={handleLibraryImportClick}
              onManageCategories={() => setShowCategoryManager(true)}
              onDiagnose={diagnoseLibrary}
              diagResult={diagResult}
              onDeleteCard={deleteLibraryCardById}
              onDeleteSelected={deleteSelectedLibraryCards}
              onMoveSelected={moveSelectedLibraryCards}
              cardSearch={librarySearch}
              setCardSearch={setLibrarySearch}
            />
            </>
          ) : view === 'edit' ? (
            <>
              {/* 업로드 영역 - 카드 있으면 작게, 없으면 크게 */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`no-print cursor-pointer rounded-2xl border-2 border-dashed transition text-center ${
                  cards.length > 0
                    ? 'p-2 sm:p-3 mb-3'  // 카드 있을 때: 작게
                    : 'p-4 sm:p-8 mb-4 sm:mb-6'  // 카드 없을 때: 크게
                } ${
                  isDragging
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-stone-300 bg-white hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={onFileChange}
                  className="hidden"
                />
                {cards.length > 0 ? (
                  // 작은 버전: 한 줄로 표시
                  <div className="flex items-center justify-center gap-2 text-stone-600 hover:text-stone-800">
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm font-semibold">이미지 추가</span>
                    <span className="hidden sm:inline text-[10px] text-stone-400">(드래그/클릭, 여러 장 가능)</span>
                  </div>
                ) : (
                  // 큰 버전: 처음 사용자용
                  <>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-stone-100 flex items-center justify-center">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" strokeWidth={2} />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                      <span className="hidden sm:inline">이미지를 끌어다 놓거나 클릭해서 선택</span>
                      <span className="sm:hidden">탭해서 이미지 선택</span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      여러 장 한꺼번에 가능 · 파일명이 자동으로 라벨이 됩니다
                    </p>
                  </>
                )}
              </div>

              {/* 인쇄 버튼 (카드 있을 때만) - 누르면 이름 물어보고 저장+인쇄 */}
              {cards.length > 0 && (
                <div className="no-print flex items-center justify-center gap-2 mb-4 flex-wrap">
                  <button
                    onClick={() => {
                      if (visibleCards.length === 0) { safeAlert('인쇄할 카드가 없습니다.'); return; }
                      const name = safePrompt('아이 이름(또는 세트 이름)을 적어주세요.\n비워두면 이름 없이 인쇄만 합니다.', '');
                      if (name === null) return; // 취소 → 아무것도 안 함
                      // 이름 있으면 그 이름으로, 없으면 자동 이름으로 저장
                      saveCurrentToHistory(name.trim() || undefined).catch(err => devWarn('저장 실패:', err));
                      // 미리보기로 전환 후, 렌더가 끝날 시간을 주고 인쇄창 실행
                      setView('preview');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'auto' });
                        doActualPrint();
                      }, 400);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
                  >
                    <FileDown className="w-4 h-4" />
                    인쇄 / PDF 저장
                  </button>
                </div>
              )}

              {/* 카드 그리드 */}
              {cards.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <div className="text-5xl mb-3">👋</div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-800 mb-1">
                    안녕하세요{currentUser ? `, ${currentUser.name || currentUser.email}` : ''} 선생님!
                  </h2>
                  <p className="text-sm text-stone-500 mb-5">첫 카드를 만들어볼까요?</p>

                  {/* 3단계 흐름 */}
                  <div className="max-w-md mx-auto mb-5 bg-white border border-stone-200 rounded-xl p-4">
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                      <div className="flex-1 text-center">
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">1</div>
                        <p className="text-[11px] sm:text-xs text-stone-700 font-medium">사진 추가</p>
                      </div>
                      <ArrowRight className="w-3 h-3 text-stone-300 flex-shrink-0 mt-[-14px]" />
                      <div className="flex-1 text-center">
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">2</div>
                        <p className="text-[11px] sm:text-xs text-stone-700 font-medium">이름 입력</p>
                        <p className="text-[9px] sm:text-[10px] text-stone-400">(예: 사과)</p>
                      </div>
                      <ArrowRight className="w-3 h-3 text-stone-300 flex-shrink-0 mt-[-14px]" />
                      <div className="flex-1 text-center">
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">3</div>
                        <p className="text-[11px] sm:text-xs text-stone-700 font-medium">PDF 저장</p>
                      </div>
                    </div>
                  </div>

                  {/* 큰 시작 버튼 - 클릭 시 파일 선택 다이얼로그 즉시 열림 */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-md transition"
                  >
                    <ImageIcon className="w-5 h-5" />
                    사진 추가해서 시작
                  </button>
                  <p className="text-[11px] text-stone-400 mt-3">클릭하면 사진을 고를 수 있어요</p>
                </div>
              ) : (
                <>
                  {/* 카드 검색 (카드 5장 이상일 때만) */}
                  {cards.length >= 5 && (
                    <div className="mb-3 flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2">
                      <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={cardSearch}
                        onChange={(e) => setCardSearch(e.target.value)}
                        placeholder="라벨로 카드 검색..."
                        className="flex-1 bg-transparent text-sm outline-none text-stone-800"
                      />
                      {cardSearch && (
                        <>
                          <span className="text-[10px] text-stone-500 tabular-nums">
                            {filteredCards.length}장
                          </span>
                          <button
                            onClick={() => setCardSearch('')}
                            className="p-1 hover:bg-stone-100 rounded transition flex-shrink-0"
                            title="검색어 지우기"
                          >
                            <X className="w-3 h-3 text-stone-500" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* 검색 결과 없음 */}
                  {visibleCards.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <Search className="w-10 h-10 mx-auto mb-2 text-stone-300" strokeWidth={1.5} />
                      <p className="text-sm">"{cardSearch}"에 해당하는 카드가 없습니다</p>
                      <button
                        onClick={() => setCardSearch('')}
                        className="mt-2 text-xs text-amber-700 hover:underline"
                      >
                        검색어 지우기
                      </button>
                    </div>
                  ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                  {visibleCards.map((card, idx) => (
                    <CardEditor
                      key={card.id}
                      card={card}
                      index={idx}
                      sizeMm={sizeMm}
                      labelPos={labelPos}
                      font={font}
                      labelSize={labelSize}
                      categories={categories}
                      isDragging={sortMode === 'default' && draggingIndex === idx}
                      dragOverIndex={sortMode === 'default' ? dragOverIndex : null}
                      onDragStart={sortMode === 'default' ? handleCardDragStart : undefined}
                      onDragOver={sortMode === 'default' ? handleCardDragOver : undefined}
                      onDrop={sortMode === 'default' ? handleCardDrop : undefined}
                      onDragEnd={sortMode === 'default' ? handleCardDragEnd : undefined}
                      onUpdate={updateCard}
                      onDelete={deleteCard}
                      onDuplicate={duplicateCard}
                      onEditImage={openImageEditor}
                    />
                  ))}
                </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="bg-stone-100 -mx-6 px-6 py-8 print:bg-white print:m-0 print:p-0">
              {cards.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                  <p className="text-sm">미리볼 카드가 없습니다</p>
                </div>
              ) : (
                <>
                  {/* 인쇄 액션 - GitHub Pages 배포 환경이라 window.print() 정상 작동, 큰 안내 박스 불필요 */}
                  <div className="no-print max-w-[210mm] mx-auto mb-4 flex flex-col items-center gap-2">
                    {/* 폰트 로딩 표시 - 로딩 중일 때만 작게 표시 */}
                    {!fontsReady && (
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="inline-block w-3 h-3 border-2 border-stone-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
                        <span>한글 폰트 로딩 중...</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (visibleCards.length === 0) { safeAlert('인쇄할 카드가 없습니다.'); return; }
                          const name = safePrompt('아이 이름(또는 세트 이름)을 적어주세요.\n비워두면 이름 없이 인쇄만 합니다.', '');
                          if (name === null) return; // 취소
                          saveCurrentToHistory(name.trim() || undefined).catch(err => devWarn('저장 실패:', err));
                          doActualPrint();
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
                      >
                        <FileDown className="w-4 h-4" />
                        인쇄 / PDF 저장
                      </button>
                    </div>
                  </div>

                  <PrintPreview
                  cards={visibleCards}
                  sizeMm={sizeMm}
                  labelPos={labelPos}
                  font={font}
                  labelSize={labelSize}
                  gap={gap}
                  showCutLines={showCutLines}
                  cutLineWidth={cutLineWidth}
                  cutLineStyle={cutLineStyle}
                  cutLineColor={cutLineColor}
                  cardRadius={cardRadius}
                  safetyMargin={safetyMargin}
                  doubleSided={doubleSided}
                  backDesign={backDesign}
                  backColor={backColor}
                  logoUrl={LOGO_DATA_URL}
                />
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* 푸터 */}
      <footer className="no-print max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 text-center text-[10px] sm:text-[11px] text-stone-400">
        © 검단ABA 언어행동연구소 · AAC maker
      </footer>
    </div>
  );
}
