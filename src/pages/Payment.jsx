import Checkbox from "@mui/material/Checkbox";
import { useContext, useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IMaskInput } from "react-imask";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../context/DataContext";


  function Payment() {
  
  const [seconds , setSeconds] = useState(180);

  const {theatres, movies} = useContext(MoviesContext);
  
  const [showModal , setShowModal] = useState(false);

  const {paymentId} = useParams();    
  
  const payObj = theatres.find(item => item?.movie?.id === paymentId);

  const mov = movies.find(item => item.id === paymentId);  

  const isSeat = JSON.parse(localStorage.getItem(paymentId)) || [];  

  useEffect(() => {
    if (seconds === 0) return;
    const id = setInterval(() => {
      setSeconds(s => s - 1)
    },1000)

    return () => clearInterval(id)

  },[seconds]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    }else {
      document.body.style.overflow = "unset"
    };

    return () => {
      document.body.style.overflow = "unset"
    }
  },[showModal]);

  
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2 , "0")}:${String(s % 60).padStart(2 , "0")}`;

  const progress = ((180 - seconds) / 180) * 100;  

  const total = isSeat.reduce((sum , item) => {
    const price = item.type === "Ailə" ? 
    mov.family : 
    mov.adult
    
    return sum + Number(price)
  },0);

  return (
    <>  
           {  showModal &&  <div className="inset-0 bg-black/50 fixed z-100  flex items-center px-5 justify-center">
                <div className="bg-[#353535] text-[#D8D9DA] max-h-[80dvh] overflow-y-auto w-350 rounded-2xl px-5 py-5">
                        <div className="flex justify-end">
                            <HiOutlineXMark onClick={() => setShowModal(false)} size={25} className="cursor-pointer" />
                         </div>
                      <div>
                        <h1 className="text-3xl">Qaydalar və şərtlər</h1>
                      </div>
                      <p className="pt-5 leading-10">Sizi "Parkcinema.az" internet resursunun veb-saytında salamlayırıq!</p>
                      <h4 className="font-bold text-2xl leading-10">I. Parkcinema.az veb saytının istifadə Şərtləri və Qaydaları</h4>
                    <div className="flex flex-col gap-4">
                      <p>
                          1.1 
                         Saytın Müdriyyəti (bundan sonra "Müdriyyət") Parkcinema.az veb-saytının(bundan sonra "Sayt") Şərtlər və Qaydalarını tərtib edib,
                         Saytın istifadəsi şərtləri və inkişafını təyin edir,həmçinin istifadəçilər və Müdriyyətin hüquq və vəzifələrini müəyyən edir.
                      </p>
                      <p>
                          1.2
                           Hazırki Şərtlər və Qaydalar (bundan sonra "Qaydalar") istifadəçi və Müdriyyət arasında hüquqi baxımdan 
                           icbari saziş xarakteri daşıyır və ona əsasən Müdriyyət tərəfindən istifadəçiyə "Flame Cinema" MMC-nin 
                           parkcinema.az Saytının istifadəsi ilə bağlı müəyyən xidmətlər aşağıdakı şərtlər üzrə təqdim olunur:
                      </p>
                       <p>
                        1.2.1 
                        İstifadəçinin “Park Cinema”nın parkcinema.az Saytına girişi və adıçəkilən Saytın istifadəsi hazırkı qaydalarla
                        tənzimlənir. Sayta daxil olaraq və onu istifadə edərək Istifadəçi hüquqi cəhətdən icbari qaydada məhdudiyyətsiz və 
                        şərtsiz ilk dəfə Sayta daxil olduğu zaman dərhal qüvvəyə minən Qaydalara riayət etməlidir. İstifadəçinin həmin Qaydalara
                        riayət etmək razılığı olmadığı halda İstifadəçi Sayta bir daha daxil olmamaq və/və ya Saytı istifadə etməmək hüququnu özündə
                        saxlayır.
                      </p>
                      <p>
                        1.2.2
                        Müdiriyyət xəbərdarlıq etmədən Qaydaları birtərəfli qaydada dayişmək və/və ya onlara əlavə etmək və saytda 
                        yerləşdirmək hüququnu özündə saxlayır. Hazırkı Qaydalar açıqdır və ictimaiyyətə təqdim olunmuş sənəd xarakteri daşıyır.
                        Qaydalar İnternetdə ** ünvanında yerləşdirilib. Müdiriyyət dəyişikliklərdən xəbərdar olmaq üçün mütəmadi olaraq həmin Qaydaları
                        təkrar oxumağa təkidlə tövsiyə edir. Istifadəçi Qaydalar bölməsinə olunmuş dəyişikliklərdən sonra parkcinema.az saytından
                        istifadə edərsə, bütün edilmiş düzəliş və/və ya dəyişiklik/əlavələrlə birlikdə həmin Qaydalara riayət etmək öhdəliyi götürmüş 
                        kimi hesab olunur.
                        </p>
                      <p>
                        1.2.3
                        Qaydaları bilməmək onlara riayət etməkdən azad etmir. İstifadəçi Sayta hər hansı bir məlumatı yerləşdirərsə, 
                        qaydalarla və onlara riayət
                        edilməsi zəruriliyi ilə razı olduğunu göstərir.
                      </p>
                    </div>
                    <h4 className="font-bold text-2xl py-10">ІІ. Müəlliflik hüquqları və Kontentə mülkiyyət hüququ.</h4>
                          <div className="flex flex-col gap-4">
                      <p>
                         2.1
                         Hazırkı Sayt və onun məzmunu, dərc olunmuş məqalələr (bundan sonra “Kontent”) Azərbaycan Respublikası qanunvericiliyi, 
                         həmçinin müəlliflik hüququ və əlaqəli hüquqlar haqqında beynəlxalq qanunvericilik
                         tərəfindən qorunur.
                      </p>
                      <p>
                        2.1.1
                        Kontentə əqli mülkiyyət hüququ: mətnlər, dizayn, loqotiplər, qrafik təsvirlər, piktoqramlar, təsvirlər və Saytdakı digər məlumatlar 
                        “Flame Cinema” MMC-nin mülkiyyətindədir,və yaxud Saytın müvafiq sahibinin 
                        icazəsi ilə yerləşdirilib.
                      </p>
                       <p>
                        2.1.2
                        Sayta istinadların yerləşdirilməsi aşağıdakı
                        şərtlərlə qəbul olunur:
                      </p>
                      <p>
                         1) İstifadəçi Müdiriyyətə hər bir istinad barəsində əvvəlcədən yazılı surətdə məlumat verməlidir;
                      </p>
                      <p>
                         2) “Park Cinema” tərəfindən İstifadəçinin saytına heç bir sponsorluq və/və ya dəstək olunması 
                         haqqında göstərişlər olmamalıdır;
                      </p>

                      <p>
                         3) İstifadəçi Müdiriyyətin tələbinə əsasən hər hansı istinadı yığışdırmalıdır.
                      </p>  
                      <p>
                        2.2.
                        İstifadəçinin “Flame Cinema” MMC və/və ya hər hansı Kontent sahibi tərəfindən yazılı surətdə verilmiş 
                        icazə olmadan kontentdən istifadəsi (surət çıxarma,nəşr və s.) qəti qadağandır. "Flame Cinema" MMC сinayət
                        təqibi daxil olmaqla, qanunvericiliyə əsasən öz əqli mülkiyyət hüququnun qorunmasını təmin edəcək.
                      </p>
                    </div>
                  <h4 className="font-bold text-2xl leading-25">3.1 Müdiriyyət Saytdakı məlumatın doğruluğunu təmin etmək üçün var gücü ilə çalışır.</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      3.1
                      Müdiriyyət Saytdakı məlumatın doğruluğunu təmin etmək üçün var gücü ilə çalışır.
                    </p>
                    <p>
                      3.2
                      Müdiriyyət məlumatın dəqiqliyi, vaxtında verilməsi, düzgünlüyü və təhlükəsizliyinə zəmanət vermir.
                    </p>
                    <p>
                      3.3
                      Saytdakı kontent qeyri-dəqiq və ya səhv ola bilər.
                    </p>
                    <p>
                      3.4
                      Müdiriyyət istənilən vaxt xəbərdarlıq etmədən Saytdakı hər hansı məlumatı dəyişmək və ya 
                      ləğv etmək hüququnu özündə saxlayır.
                    </p>
                    <p>
                      3.5
                      “Flame Cinema” MMC öz mülahizəsinə əsasən Saytın fəaliyyətini dayandıra bilər.
                    </p>
                    <p>
                      3.6 
                      Aşağıdakı hallarda Müdiriyyət hər hansı bir zərər və ya zədəyə görə məsuliyyət daşımır:
                    </p>
                    <p>
                      3.6.1 
                      Saytın istifadəsi və ya istifadəsinin mümkünsüzlüyü
                    </p>
                    <p>
                      3.6.2
                      Məlumatın dəyişdirilməsi və ya çıxarılması,
                      həmçinin Saytın fəaliyyətinin dayandırılması
                    </p>
                    <p>
                      3.7
                      Müdiriyyət cədvəlin qeyri-dəqiqliyi nəticəsində dəyən zərərə görə məsuliyyət daşımır.
                      Qeyd: Saytın Müdiriyyəti istənilən kinoteatrda cədvəl dəqiqliyinə zəmanət vermir, çünki Müdiriyyət cədvəli
                      saytın Müdiriyyətinə xəbər etmədən qismən və ya tam dəyişə bilər. Müdiriyyət xoşagəlməz vəziyyətlərlə rastlaşmamaq
                      üçün kinoteatra gəlməzdən öncə cədvəli dəqiqləşdirməyi təkidlə tövsiyə edir.
                    </p>
                  </div>
                  <h4 className="text-2xl leading-25 font-bold">ІІІ. Saytın məzmunu və fəaliyyəti</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      3.1
                      Müdiriyyət Saytdakı məlumatın doğruluğunu təmin etmək üçün var gücü ilə çalışır.
                    </p>
                    <p>
                      3.2 
                      Müdiriyyət məlumatın dəqiqliyi, vaxtında verilməsi, düzgünlüyü və təhlükəsizliyinə zəmanət vermir.
                    </p>
                    <p>
                      3.3
                      Saytdakı kontent qeyri-dəqiq və ya səhv ola bilər.
                    </p>
                    <p>
                      3.4
                      Müdiriyyət istənilən vaxt xəbərdarlıq etmədən Saytdakı hər hansı məlumatı dəyişmək və ya ləğv etmək
                      hüququnu özündə saxlayır.
                    </p>
                    <p>
                      3.5
                      “Flame Cinema” MMC öz mülahizəsinə əsasən Saytın fəaliyyətini dayandıra bilər.
                    </p>
                    <p>
                      3.6 
                      Aşağıdakı hallarda Müdiriyyət hər hansı bir zərər və ya zədəyə görə məsuliyyət daşımır:
                    </p>
                    <p>
                      3.6.1
                      Saytın istifadəsi və ya istifadəsinin mümkünsüzlüyü
                    </p>
                    <p>
                      3.6.2 
                      Məlumatın dəyişdirilməsi və ya çıxarılması, həmçinin Saytın fəaliyyətinin dayandırılması
                    </p>
                    <p>
                      3.7
                      Müdiriyyət cədvəlin qeyri-dəqiqliyi nəticəsində dəyən zərərə görə məsuliyyət daşımır. 
                      Qeyd: Saytın Müdiriyyəti istənilən kinoteatrda cədvəl dəqiqliyinə zəmanət vermir, çünki 
                      Müdiriyyət cədvəli saytın Müdiriyyətinə xəbər etmədən qismən və ya tam dəyişə bilər. 
                      Müdiriyyət xoşagəlməz vəziyyətlərlə rastlaşmamaq üçün kinoteatra gəlməzdən öncə cədvəli 
                      dəqiqləşdirməyi təkidlə tövsiyə edir.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">IV. Digər saytlara istinad</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      4.1
                      Hazırkı Saytda "Flame Cinema" MMC-yə məxsus olmayan digər saytlara
                      istinadlar və reklam bannerləri yerləşdirilə bilər.
                    </p>
                    <p>
                      4.1.1
                      Digər veb-saytlara istinadlar demək deyil ki, Sayt həmin saytlara 
                      (və ya saytın təqdim etdiyi hər hansı məlumat, xidmət və məhsullara) dəstəkdir,
                      və həmin istinadlar “Park Cinema”nın saytları idarə edən fiziki və hüquqi şəxsləri ilə assosiasiyada 
                      olduğunu və ya eyni sosial məsuliyyət daşıdığını göstərmir.
                    </p>
                    <p>
                      4.1.2
                      “Park Cinema” 3-cü tərəfə məxsus veb-saytlara yalnız İstifadəçinin rahatlığı üçün istinad edir
                      və onların məhsul və/və ya xidmətlərindən istifadə etməyi tövsiyə etmir.
                    </p>
                    <p>
                      4.2
                      Müdiriyyət istinad olunan 3-cü tərəflərə məxsus sayt və sahifələrə nəzarət etmir, və bununla əlaqədar
                      Müdiriyyət saytların fəaliyyətinə, onların istifadəsi zamanı istifadəçiyə dəymiş 
                      zərərə görə məsuliyyət daşımır.
                    </p>
                    <p>
                      4.2.1
                      İstifadəçinin “Park Cinema”nı üçüncü tərəflə yaranan münaqişəyə cəlb etmək hüququ yoxdur. Bu müddəa 
                      “Flame Cinema” MMC-yə məxsus olmayan bütün istinad olunan saytlara, onların məzmununa aiddir.
                    </p>
                  </div>
                  <h4 className="text-2xl leading-25 font-bold">V. Saytın istifadəsi</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      5.1.
                      “Park Cinema”nın parkcinema.az/ veb-saytına daxil olan hər bir kəs saytın İstifadəçisi ola bilər
                      və Saytın təqdim olunan interaktiv xidmətlərindən qeydiyyatsız istifadə edə bilər.
                    </p>
                    <p>
                      5.2
                      Təqdim olunan xidmətlər və interaktiv xidmətlərdən bütövlükdə istifadə etmək üçün İstifadəçi qeydiyyatdan 
                      keçə bilər. Bu tədqirdə İstifadəçi:
                    </p>
                    <p>
                      5.2.1
                      Sayta parolu təkrarən daxil etmədən öz adına bağlanmış nik vasitəsilə daxil ola bilər.
                    </p>
                    <p>
                      5.2.2
                      İstifadəçi e-mail vasitəsilə verdiyi və ya abunə olduğu suallara cavab ala bilər.
                    </p>
                    <p>
                      5.2.3
                      İstifadəçi aşağıdakı hərəkətləri edə bilər:
                    </p>
                    <p>
                      1)
                       Film, kinoteatr, aktyor və s. haqqında rəylər bildirmək;
                    </p>
                    <p>
                      2)
                      Film, aktyorları və s. qiymətləndirmək;
                    </p>
                    <p>
                      3)
                      Sizi maraqlandıran filmləri izləmək;
                    </p>
                    <p>
                      4)
                       Müsabiqədə iştirak etmək;
                    </p>
                    <p>
                      5)
                      Saytın xəbərlərini almaq;
                    </p>
                    <p>
                      6)
                        Redaktor adını qazanaraq, Müdiriyyət və saytın redaksiyası ilə birlikdə Saytın fəaliyyətində 
                        iştirak etmək: şəxsi tənqidlərinizi, 
                        filmlər üçün multimedia fayllarınızı, sevimli aktyorların şəkillərini yerləşdirə bilərsiniz.
                    </p>
                    <p>
                      5.2.4 
                      Sayta şərh əlavə etmək üçün İstifadəçi aşağıdakı qaydalara riayət etməlidir:
                    </p>
                    <p>
                      (1) Mövcud qanunvericiliyin qaydalarını pozmaq çağırışları, irqçi bəyanatlar, millətlərarası ədavətin qızışdırılması və
                       Azərbaycan Respublikası Cinayət Məcəlləsinin təsiri altına düşən çağırışların;
                    </p>
                    <p>
                      (2) Bilərəkdən yalan məlumatların;
                    </p>
                    <p>
                      (3) Reklam məzmunlu informasiyanın;
                    </p>
                    <p>
                      (4) Kobud, ədəbsiz ifadələr və təhqirlər, şəxsiyyətə toxunan sözlərin;
                    </p>
                    <p>
                      (5) Mövzuya aid olmayan xəbərlərin yerləşdirilməsi qadağandır.
                    </p>
                    <p>
                      5.2.5 
                      Başqasının rəyi ilə razılaşdıqda “+1” qoyaraq səs vermək olar.
                    </p>
                    <p>
                      5.3 Müdiriyyət:
                    </p>
                    <p>
                      (1) digərinin sitatını təkrarlayan məlumatı ləğv etmək;
                    </p>
                    <p>
                      (2) rəyləri çıxarmaq və düzəliş etmək hüququnu özündə saxlayır.
                    </p>
                    <p>
                      5.4
                      Müdiriyyət saytda İstifadəçi tərəfindən yerləşdirilən xəbərlər və rəylərə görə məsuliyyət daşımır,
                      çünki hər bir məlumat müəllifinin fikirlərini bildirir.
                    </p>
                    <p>
                      5.5
                      İstifadəçi qaydaları pozduqda, Müdiriyyət birtərəfli qaydada xəbərdarlıq etmədən İstifadəçinin qeydiyyatını
                      pozmaq hüququnu özündə saxlayır.
                    </p>
                    <p>
                      «Boston River LP» tərəfindən yaradılan və dəstəklənən “Park Cinema” kinoteatrlar şəbəkəsinin parkcinema.az
                      saytında (bundan sonra – “Sayt”) “onlayn” üsulu ilə biletlərin alınması Qaydaları və Şərtləri 
                      ilə tanış olmağınızı Sizdən xahiş edirik.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">Bilet alınması şərtləri və qaydaları</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      1. MÜQAVİLƏDƏ İSTİFADƏ OLUNAN TERMİNLƏR VƏ ANLAYIŞLAR
                    </p>
                    <p>
                      «Seans» ParkCinema kinoteatrlar şəbəkəsinin tədbir və filmlərin vaxtı.
                    </p>
                    <p>
                      «Bilet» ParkCinema kinoteatrlar şəbəkəsinin tədbir və filmləri müəyyən tarix və vaxtda ziyarət etmək 
                      hüququnu verən ciddi hesabat blankında təqdim olunmuş sənəd.
                    </p>
                    <p>
                      «Alıcı» AR qanunvericiliynə uyğun hazırkı Müqavilədə qeyd olunan əqdləri bağlamaq hüququ yaradan yaşa 
                      çatmış və onlayn üsulu ilə biletləri əldə edən fəaliyyət qabiliyyəti olan fiziki şəxs.
                    </p>
                    <p>
                      «Şəxsi məlumat» Müştəri haqqında ödəniş səhifəsində bilet alma məqsədi ilə daxil edilən məlumat.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">2. ONLAYN ÜSULU İLƏ BİLET ƏLDƏ ETMƏK ÜÇÜN ALICI AŞAĞIDAKILARI ETMƏLİDİR.</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      2.1
                      Saytın “Cədvəl” bölməsində onu maraqlandıran film və ya tədbiri, həmçinin Park Cinema 
                      şəbəkəsinin kinoteatrlarından birini, tarix və vaxtı seçməlidir.
                    </p>
                    <p>
                      2.2
                      “Onlayn” üsulu ilə biletlərin alınması Qaydaları və Şərtləri ilə tanış olur və onları qəbul edib/ etməyəcəyinə qərar verir.
                    </p>
                    <p>
                      2.3
                      Hazırkı Qaydalar və Şərtləri qəbul edir, üzə çıxan pəncərədə biletlərin sayını və lazım olan tarifi
                      seçir və “İrəli” düyməsi ilə həmin seçimi təsdiqləyir. DİQQƏT! Bu seçim üçün Alıcıya 30 saniyə vaxt verilir.
                    </p>
                    <p>
                      2.4
                      Növbəti mərhələdə zalda yerləri seçir, “İrəli” düyməsi ilə həmin seçimi təsdiqləyir. 
                      Diqqət! Bu seçim üçün Alıcıya 1 dəqiqə vaxt verilir.
                    </p>
                    <p>
                      2.5
                      Bilet məlumatlarının dəqiqliyini yoxlayır (filmin adı, kinoteatr, biletlərin sayı, yerlər və məbləğ),
                      ödəniş üsulunu seçir (MasterCard və ya Visa) və alışı təsdiqləmək üçün əlaqə məlumatları daxil edir. 
                      Diqqət! Bu seçim üçün Alıcıya 1 dəqiqə vaxt verilir.
                    </p>
                    <p>
                      2.6
                      Ödəniş səhifəsində tələb olunan Şəxsi məlumatları daxil edir və “Daxil etmək” düyməsi ilə Seansa Biletin
                      alınmasını təsdiqləyir.
                    </p>
                    <p>
                      2.7
                      SMS vasitəsilə və ya elektron ünvana təsdiq nömrəsi alaraq Alıcı öz biletlərini kassada
                      və ya Park Cinema kinpoteatrlar şəbəkəsinin terminallarında əldə edə bilər.
                    </p>
                    <p>
                      Diqqət! Biletin ödənişi AZN ilə həyata keçirilir. Əgər ödəniş kartının valyutası başqadırsa, o zaman biletin məbləği ödənişin həyata keçirildiyi 
                      tarixə müştərinin bank hesabının valyutasına emitent bankın məzənnəsi ilə konvertasiya olunur.
                    </p>
                    <p>
                      Xarici banklar onlayn ödənişə görə komissiya kimi əlavə məbləğ tuta bilər.
                      Ödəniş şərtlərini dəqiqləşdirmək üçün öz emitent bankınızla əlaqə saxlayın.
                    </p>
                    <p>
                      Biletin qiyməti Saytda göstərilib və Kinoteatrın Müdiriyyəti ilə müəyyən edilir.
                    </p>
                    <p>
                      3D formatında nümayiş olunan kinoseansa biletlərin dəyərinə 3D eynəklərin qiyməti daxil deyil.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">3. BİLETLƏRİN QAYTARILMASI ŞƏRTLƏRİ.</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      3.1
                      . Əgər Alıcı seansa Bilet alıbsa (hesabdan pul silinibsə), lakin biletin ödənişi təsdiqlənməyibsə (elektron biletin nömrəsi ilə mesaj),
                      Alıcı alışı təsdiqlətdirmək üçün Kinoteatrın Müdiriyyətinə yaxınlaşmalıdır. Əgər seçilmiş yerlərə sistemdə bron qoyulmayıbsa kinoteatr 
                      ödənilmiş məbləği geri qaytarır. Pul 20 gün ərzində Alıcının hesablaşma hesabına köçürüləcək.
                    </p>
                    <p>
                      3.2
                      Əgər Alıcı seansa Bilet alıbsa və satış (bron statusunun dəyişdirilməsi) uğurla həyata keçirilibsə, lakin Alıcı öz təşəbbüsü ilə 
                      seansa Biletdən imtina edir və Seansın başlanğıcından 24 saat öncə bu haqqda Kinoteatrın Müdiriyyətini xəbərdar edibsə, Müdiriyyət 
                      Alıcıya ödənilmiş Biletin məbləğini qaytarır.
                    </p>
                    <p>
                      3.3. Müştəriyə pul ödənilmiş məbləğdə qaytarılır.
                    </p>
                    <p>
                      3.4.
                      Seans bitdikdən sonra Biletlər geri qaytarılmır. Fors-major hadisələr (nümayişin kəsilməsi, keyfiyyətsiz nümayiş)
                       istisna hallar təşkil edir.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">4. YEKUN MÜDDƏALAR</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      4.1.
                      Hazırkı Saytda Biletlərin alınması Qaydaları və Şərtləri Saytın Müdiriyyəti 
                      (bundan sonra -“Müdiriyyət”) tərəfindən hazırlanıb və biletin alınma, verilmə, geri qaytarılması
                      şərtlərini və Alıcının şəxsi məlumatların məxfiliyini müəyyən edir.
                    </p>
                    <p>
                      4.2.
                      Hazırkı Şərtlər və Qaydalar (bundan sonra – “Qaydalar”) Alıcı və Müdiriyyət arasında hüquqi qüvvəyə 
                      malik Müqavilədir, predmeti onlayn üsulu ilə bilet alınması «Boston River LP» tərəfindən aşağıdakı 
                      şərtlərlə göstərilən xidmətidir:
                    </p>
                    <p>
                      4.2.1.
                      Alıcı tərəfindən onlayn üsulu ilə bilet alınması hazırkı Qaydalar çərçivəsində həyata keçirilir. Bilet almazdan öncə Alıcı
                      Qaydalara heç bir məhdudiyyət olmadan icbari qaydada riayət etməsini qəbul edir. Qaydalar onlayn üsulu ilə hər bir alış
                      zamanı dərhal qüvvəyə minir. Alıcı hazırkı Qaydalara riayət etməyə razı olmazsa, Alıcı saytda biletin onlayn üsulu ilə 
                      alışını bir daha istifadə etməmək hüququna malikdir.
                    </p>
                    <p>
                      DİQQƏT! Hazırkı Qaydalar ödəniş kartları ilə biletlərin onlayn ödənişini tənzimləyir və “Park Cinema” şəbəkəsinin kassalarında ödənişlərə şamil olunmur.
                    </p>
                    <p>
                      4.2.2
                      Müdiriyyət xəbərdarlıq etmədən Qaydaları birtərəfli qaydada dayişmək və/və ya onlara əlavə etmək və
                      saytda yerləşdirmək hüququnu özündə saxlayır.
                    </p>
                    <p>
                      Hazırkı Qaydalar açıqdır və ictimaiyyətə təqdim olunmuş sənəd xarakteri daşıyır. 
                      Hazırkı Qaydalar İnternet şəbəkəsində:
                      www.parkcinema.azbilet-alinmasi-sertleri-ve-qaydalari ünvanında yerləşdirilib.
                    </p>
                    <p>
                      Müdiriyyət dəyişikliklərdən xəbərdar olmaq üçün bilet almazdan öncə mütəmadi olaraq həmin
                      Qaydaları təkrar oxumağa təkidlə tövsiyə edir. Hazırkı qaydalarla razılaşıb onlayn üsulu
                      ilə bilet alışının növbəti səhifəsinə keçərək 
                      Alıcı bütün edilmiş düzəliş və/və ya dəyişiklik/əlavələrlə birlikdə həmin Qaydalara riayət 
                      etmək öhdəliyini götürmüş kimi hesab olunur.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">5. MƏXFİLİK</h4>
                  <div className="flex flex-col gap-4">
                    <p>
                      1. 
                      Biz kart məlumatlarını saxlamırıq; bütün kart məlumatlarını prosessinq mərkəzi saxlayır və emal edir.
                    </p>
                    <p>
                      2.
                      Biz müştəri barədə aşağıdakı məlumatları saxlayırıq:
                    </p>
                    <p>
                        - Ad və Soyad
                    </p>
                    <p>
                        - Alış zamanı göstərilmiş e-mail
                    </p>
                    <p>
                        - Alış zamanı göstərilmiş mobil nömrə
                    </p>
                    <p>
                      3. 
                      Bütün şəxsi məlumat yalnız xidmətlərin göstərilməsi və reklam məqsədi ilə saxlanılır.
                    </p>
                    <p>
                      4. 
                      Biz Alıcının şəxsi məlumatlarını qanun tələbləri istisna olmaqla, üçüncü şəxslərə ötürmürük.
                    </p>
                  </div>
                  <h4 className="text-2xl font-bold leading-25">İtirilmiş əşyalarla bağlı qaydalar</h4>
                  <div className="max-w-200">
                    <img src="https://new.parkcinema.az/_next/image?url=%2Fimages%2Fterms-az.png&w=2048&q=75" className="max-full" alt="" />
                  </div>
                </div>
            </div> }
            
            <div className="h-screen">
              <div className="pt-30 px-15">
                <h1 className="capitalize text-[#D9DADB] text-3xl">ödəniş</h1>
              </div>
              <div className="px-14 pt-10">
                  <div className="text-end py-2 text-[#797979]">{fmt(seconds)}</div>
                <div className="w-full rounded-full bg-[#6C6C6C]">
                  <div style={{width: `${progress}%`}} className="bg-[#D52B1E] p-1 rounded-full"></div>
                </div>
              </div>
              <div className="justify-between flex flex-wrap px-15 xl:py-10 lg:py-10 gap-5">
                  <div className="flex flex-col gap-10 w-100">
                    <input name="email" placeholder="Email" className="border-b p-2  outline-0 text-white border-[#9B9C9C] placeholder:text-[#9B9C9C]" type="email" />
                    <div className="flex items-center gap-2 relative">
                        <span className="text-white border-b leading-10 absolute left-0">+994</span>
                          <IMaskInput
                            className="text-white placeholder:text-[#9CA3AF] outline-0 border-b px-10 border-[#D9DADB] w-full leading-10"
                            mask="00 000  00  00"
                            placeholder="50 123 32 24" 
                            name="phone" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label id="check" className="flex items-center">
                        <Checkbox name="check" sx={{color: "white", '&.Mui-checked': {color: "white"}}} />
                        <p id="check" className="text-[#D8D9D7] cursor-pointer">Mən <span onClick={() => setShowModal(true)} className="cursor-pointer underline text-white">Qaydalar və şərtlər </span>  oxudum razıyam</p>
                      </label>
                    </div>
                    <div className="text-end">
                      <button className="bg-[#D52B1E] hover:bg-[#d52a1eb9] transition-colors duration-300 text-[#D9DACF]  p-[10px_35px] cursor-pointer rounded-full">Ödənişə keç</button>
                    </div>
                  </div>
                  <div className="bg-[#4D4D4D] p-3 w-120 rounded-2xl">
                    <p className="text-[#D9DADB] px-2 py-2">{mov?.name}</p>
                    <p className="text-[#D9DADB] px-2 py-2">{payObj?.theatreTitle}</p>
                    <p className="text-[#D9DADB] px-2 py-2">{mov?.firstScreeningDate} {payObj?.time}</p>
                    {
                      isSeat.map((item , i) => 
                      <p key={i} className="text-[#D9DADB] px-2 py-2">Sıra {item?.row} , Yer {item?.seat} {item?.type === "Ailə" ? "Ailə" : "Böyük"}</p>
                      )
                    }
                    <p className="text-[#D9DADB] px-2 py-2 font-bold">Ümumi : {total} AZN</p>
                  </div>
              </div>
            </div> 
    </>
  )
}

export default Payment
